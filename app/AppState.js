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
    imgUrl: 'https://thiscatdoesnotexist.com'
  })

const testHouse = new House({
  sqFootage: 2500,
  location: 'Nampa, Idaho',
  bedrooms: 5,
  bathrooms: 3,
  acreage: 1.2,
  description: 'Victorian wonder!',
  imgUrl: 'https://thiscatdoesnotexist.com'
})

const testJob = new Job({
  logoUrl: 'https://thiscatdoesnotexist.com',
  hiringCompany: 'Cats-R-Us',
  location: 'Boise, Idaho',
  title: `Jeremy's assistant`,
  description: 'Helps Jeremy manage his cats',
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
