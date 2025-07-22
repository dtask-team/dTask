import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  deadline: String,
  skills: [String],
  attachment: String,
  postedAt: { type: Date, default: Date.now },

  // Updated applicants
  applicants: [
    {
      freelancerId: { type: String, required: true }, // can be wallet or user ID
      name: String,
      appliedAt: { type: Date, default: Date.now }
    }
  ]
});

const Task = mongoose.model('Task', taskSchema);
export default Task;

