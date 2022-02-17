import { Car } from "./Models/Car.js"
import { House } from "./Models/House.js"
import { Job } from "./Models/Job.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

const testCar = new Car(
  {
    make: 'GMC',
    model: 'Sierra',
    year: 2018,
    price: 5600,
    description: 'its cool.',
    color: '#FFFFFF',
    imgUrl: 'https://www.autodetective.com/uploads/photos/gmc/sierra%201500/2018/1665524.jpg'
  })

const testHouse = new House({
  sqFootage: 2500,
  location: 'Nampa, Idaho',
  bedrooms: 5,
  bathrooms: 3,
  acreage: 1.2,
  description: 'Victorian wonder!',
  imgUrl: 'http://classifieds.craigclassifiedads.com/images/2014/07/22/316691/5-bedroom-3-bath-home_1.jpg'
})

const testJob = new Job({
  logoUrl: 'https://cdn.dribbble.com/users/153055/screenshots/9528745/media/866c93a9d71a30fce2b49abeb0361545.jpg',
  hiringCompany: 'Cats-R-Us',
  location: 'Boise, Idaho',
  title: `Jeremy's assistant`,
  description: 'Help Jeremy manage his cats!',
  salary: 500
})

class AppState extends EventEmitter {

  // NOTE just adds intellisense to our cars array that lets our code know its an array of cars, not other things 
  /** @type {import('./Models/Car').Car[]} */
  cars = [testCar]

  /** @type {import('./Models/House').House[]} */
  houses = [testHouse]

  /** @type {import('./Models/Job').Job[]} */
  jobs = [testJob]
}


export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
