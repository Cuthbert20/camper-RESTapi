// Create schema of fields for courses.

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please Add a course Title!"]
  },
  description: {
    type: String,
    required: [true, "Pretty Please add a description"]
  },
  weeks: {
    type: String,
    required: [true, "Please add how many weeks for course duration"]
  },
  tuition: {
    type: Number,
    required: [true, "Please add tuition cost"]
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add minimum skill level"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  scholarshipsAvailable: {
    type: Boolean,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true
  }
});

module.exports = mongoose.model("Course", CourseSchema);
