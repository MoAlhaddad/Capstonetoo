const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    text: { type: String, required: [true, "Please add a job title"] },
    country: { type: String, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    Description: { type: String, required: true },
    company: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
