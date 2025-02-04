import { ProxyState } from "../AppState.js";
import { getJobForm } from "../Components/JobForm.js";
import { jobService } from "../Services/JobService.js";

function _draw() {
  let template = ''
  ProxyState.jobs.forEach(j => template += j.Template)
  document.getElementById('listings').innerHTML = template
}

export class JobController {
  constructor() {
    // console.log('jobcontroller connected');
    ProxyState.on('jobs', _draw)
  }

  showJobs() {
    _draw()
    document.getElementById('modal-body-slot').innerHTML = getJobForm()
  }

  addJob(event) {
    event.preventDefault()
    let form = event.target
    let submittedJob = {
      hiringCompany: form.hiringCompany.value,
      location: form.location.value,
      title: form.title.value,
      description: form.description.value,
      salary: form.salary.value,
      logoUrl: form.logoUrl.value
    }
    // console.log(submittedJob);
    jobService.addJob(submittedJob)
    form.clear()
    bootstrap.Modal.getOrCreateInstance(modal).hide()
  }

  deleteJob(jobId) {
    jobService.deleteJob(jobId)
  }


}