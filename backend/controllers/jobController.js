const asyncHandler = require("express-async-handler");

const Job = require("../models/jobModel");

// @desc Get Jobs
//@route GET /api/jobs
//@access Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id });

  res.status(200).json(jobs);
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
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(job);
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

  const user = await User.findById(req.user.id)
 
  //Check for user
  if(!user) {
      res.status(401)
      throw new Error('User not found')
  }


  //Make sure the logged in user matches the job user
  if(job.user.toString() !== user.id) {
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

  const user = await User.findById(req.user.id)
 
  //Check for user
  if(!user) {
      res.status(401)
      throw new Error('User not found')
  }


  //Make sure the logged in user matches the job user
  if(job.user.toString() !== user.id) {
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
