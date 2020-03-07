class TaskManager {
  constructor() {
    // ID: [job]
    this.jobs = {};
  }

  // add job
  addJob = (user, job) => {
    // make id
    let id = this.generateID();
    // add user attached to this job
    job.user = user.username;
    // add job
    this.jobs[id] = job;
    // return id attached to job
    return id;
  }

  // remove job
  // return true if successful
  removeJob = (id) => {
    if (!this.validJob(id))
      return false;
    else {
      this.jobs[id] = undefined;
      return true;
    }
  }

  // update the job
  // return true if success
  updateJob = (id, job) => {
    if (!this.validJob(id)) {
      // move auxilary information over
      job.info = this.jobs[id].info;
      this.jobs[id] = job;
      return true;
    }

    return false;
  }

  // returns job if found, otherwise false
  getJob = (id) => {
    return this.jobs[id];
  }

  // returns true if job found, false otherwise
  validJob = (id) => {
    return this.jobs[id] !== undefined;
  }

  // make ID for job
  generateID = () => {
    const valid = "ABCDEFGHIJKLMNPQRSTUVWXYZ1234567890";
    let id;

    do {
      id = "";

      for (let i = 0; i < 4; i++){
        const char = valid[Math.floor(Math.random() * valid.length)];
        code += char;
      }

      if (this.validJob(code)) return code;
    } while (this.validJob(code)));
  }
}

module.exports = TaskManager;
