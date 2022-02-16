import { ProxyState } from "../AppState.js";
import { Job } from "../Models/Job.js"



class JobService {
  addJob(submittedJob) {
    let newJob = new Job(submittedJob)
    // console.log(newJob);
    ProxyState.jobs = [newJob, ...ProxyState.jobs]
  }
}

export const jobService = new JobService