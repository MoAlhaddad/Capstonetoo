const asyncHandler = require("express-async-handler");
const axios = require('axios');
const config = require('../config');

const Job = require("../models/jobModel");

// @desc Get Jobs
//@route GET /api/jobs
//@access Private
const getJobs = asyncHandler(async (req, res) => {
  console.log("CONFIG:", config);
  const jobs = await axios.get(`
      https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${config.APP_ID}&app_key=${config.API_KEY}
  `);

  return res.status(200).json({jobs: jobs.data.results});
});

// @desc Set Jobs
//@route POST /api/jobs
//@access Private
const setJob = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const job = await Job.create({
    text: req.body.title,
    job_title: req.body.job_title,
    company: req.body.company,
    country: req.body.country,
    department: req.body.department,
    salaryFrom: req.body.salaryFrom,
    salaryTo: req.body.salaryTo,
    minSalary: req.body.salaryFrom,
    maxSalary: req.body.salaryTo,
    experience: req.body.experience,
    skillsRequired: req.body.skillsRequired,
    minimumQualification: req.body.minimumQualification,
    smallDescription: req.body.smallDescription,
    fullDescription: req.body.fullDescription,
    Description: req.body.fullDescription,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    companyDescription: req.body.companyDescription,
    postedBy: req.user.id,
    user: req.user.id,
  });
  console.log("JOB:", job);
  return res.status(200).json({job});
});

// @desc Update Jobs
//@route Put /api/jobs
//@access Private

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(400);
    throw new Error("Job not found");
  }

 
 
  //Check for user
  if(!req.user) {
      res.status(401)
      throw new Error('User not found')
  }


  //Make sure the logged in user matches the job user
  if(job.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ updatedJob });
});

// @desc Delete Jobs
//@route Delete /api/jobs
//@access Private

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.paramas.id);

  if (!job) {
    res.status(400);
    throw new Error("Job not found");
  }

 
 
  //Check for user
  if(!req.user) {
      res.status(401)
      throw new Error('User not found')
  }


  //Make sure the logged in user matches the job user
  if(job.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
  }


  await job.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
};