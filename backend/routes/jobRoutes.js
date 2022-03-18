const express = require("express");
const router = express.Router();
const { getJobs, setJob, updateJob, deleteJob } = require('../controllers/jobController')

router.route('/').get(getJobs).post(setJob)
router.route('/:id').delete(deleteJob).put(updateJob)

router.get("/", getJobs);

router.post("/", setJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

module.exports = router;
