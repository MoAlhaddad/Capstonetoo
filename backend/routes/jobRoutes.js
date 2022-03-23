const express = require("express");
const router = express.Router();
const { getJobs, setJob, updateJob, deleteJob } = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddlware')

router.get("/", protect, getJobs);

router.post("/", protect, setJob);

router.put("/:id", protect, updateJob);

router.delete("/:id", protect, deleteJob);

module.exports = router;