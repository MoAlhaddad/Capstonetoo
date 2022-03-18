
const asyncHandler = require('express-async-handler');

// @desc Get Jobs
//@route GET /api/jobs
//@access Private
const getJobs = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get jobs' })
})



// @desc Set Jobs
//@route POST /api/jobs
//@access Private
const setJob = asyncHandler(async (req, res) => {
     if(req.body.text) {
         res.status(400)
         throw new Error('Please add a text field')
     }

    res.status(200).json({ message: 'Set job' });
})


// @desc Update Jobs
//@route Put /api/jobs
//@access Private

const updateJob = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update job ${req.params.id}` })
})

// @desc Delete Jobs
//@route Delete /api/jobs
//@access Private

const deleteJob = asyncHandler(async (req, res) => {
    res.status(200).json({  message: `Delete job ${req.params.id}`})
})



module.exports = {
    getJobs,
    setJob,
    updateJob,
    deleteJob,
}