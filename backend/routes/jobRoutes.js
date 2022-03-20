const express = require("express");
const router = express.Router();
const { getJobs, setJob, updateJob, deleteJob } = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddlware')

router.route('/').get(protect, getJobs).post(protect, setJob)
router.route('/:id').delete(protect, deleteJob).put(protect, updateJob)

router.get("/", getJobs);

router.post("/", setJob);

router.put("/:id", updateJob);

router.delete("/:id", deleteJob);

module.exports = router;
