import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import dTaskLogo from '../assets/logo.png';

const ClientTask = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills: '',
    attachments: null,
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, attachments: file }));
  };

  const handlePostTask = async (e) => {
    e.preventDefault();
    const taskData = new FormData();
    taskData.append('title', formData.title);
    taskData.append('description', formData.description);
    taskData.append('budget', formData.budget);
    taskData.append('deadline', formData.deadline);
    taskData.append('skills', formData.skills);
    if (formData.attachments) {
      taskData.append('attachments', formData.attachments);
    }

    try {
      const response = await fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        body: taskData,
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prev) => [...prev, newTask]);
        setFormData({
          title: '',
          description: '',
          budget: '',
          deadline: '',
          skills: '',
          attachments: null,
        });
        alert('✅ Task posted and saved to MongoDB!');
      } else {
        alert('❌ Failed to post task to server.');
      }
    } catch (error) {
      console.error('Post error:', error);
      alert('❌ Error posting task.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ✅ Header styled same as Landing Page */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <div className="flex items-center space-x-4 overflow-hidden h-16">
          <img
            src={dTaskLogo}
            alt="dTask Logo"
            className="h-12 w-auto object-contain rounded-md"
          />
        </div>
        <nav className="flex space-x-4 text-sm sm:text-base font-semibold text-gray-700">
          <button
            onClick={() => navigate('/client-landing')}
            className="hover:text-blue-600 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/client-dashboard')}
            className="hover:text-blue-600 transition"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 transition"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* ✅ Task Form */}
      <div className="max-w-2xl mx-auto p-6 mt-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Task</h2>
        <form onSubmit={handlePostTask} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="e.g. Design a dApp UI"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Detailed description of the task"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              required
              placeholder="e.g. 0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
            <input
              type="text"
              name="deadline"
              value={formData.deadline}
              onChange={handleInputChange}
              required
              placeholder="e.g. 3 Days"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            required
            placeholder="e.g. React, Tailwind, UI/UX"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
          <label className="flex items-center cursor-pointer text-blue-600 hover:underline">
            <Upload className="w-4 h-4 mr-1" /> Upload
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
          {formData.attachments && (
            <p className="text-sm text-gray-600 mt-1">
              Attached: {formData.attachments.name}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Post Task
          </button>
        </form>
      </div>

      {/* ✅ Task List */}
      {tasks.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 px-6 pb-16">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Posted Tasks</h3>
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Deadline: {task.deadline} | Budget: {task.budget} ETH
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      Posted: {task.postedDate}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {task.skills?.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {task.attachmentUrl && (
                    <a
                      href={task.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline"
                    >
                      View Attachment
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientTask;
