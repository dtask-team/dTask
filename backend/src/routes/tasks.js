import express from 'express';
import multer from 'multer';
import Task from '../models/Task.js';

import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// POST /api/tasks - Create new task
router.post('/', upload.single('attachments'), async (req, res) => {
  try {
    const { title, description, budget, deadline, skills } = req.body;

    const newTask = new Task({
      title,
      description: description || '',
      budget: parseFloat(budget),
      deadline,
      skills: skills.split(',').map(skill => skill.trim()),
      attachment: req.file ? req.file.filename : ''
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error('❌ Error saving task:', err);
    res.status(500).json({ error: 'Failed to post task' });
  }
});

// GET /api/tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ postedAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ✅ POST /api/tasks/:taskId/apply - Apply for a task (no proposal)
router.post('/:taskId/apply', async (req, res) => {
  const { freelancerId, name } = req.body;

  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Prevent duplicate applications
    const alreadyApplied = task.applicants?.some(a => a.freelancerId === freelancerId);
    if (alreadyApplied) {
      return res.status(400).json({ error: 'You have already applied to this task' });
    }

    task.applicants.push({
      freelancerId,
      name,
      appliedAt: new Date()
    });

    await task.save();
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('❌ Error applying for task:', err);
    res.status(500).json({ error: 'Failed to apply for task' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id',  async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Optional: Check if requester is the owner
    // if (task.postedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

    await task.deleteOne();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error("❌ Delete task error:", err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

export default router;

