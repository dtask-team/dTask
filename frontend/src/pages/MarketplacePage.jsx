import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

const MarketplacePage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [visibleCount, setVisibleCount] = useState(6);
  const [freelancerId, setFreelancerId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchFreelancer = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
      const res = await fetch("http://localhost:4000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFreelancerId(data._id);
    };
    fetchFreelancer();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/tasks');
        const data = await response.json();

        const token = localStorage.getItem("authToken");
        const userRes = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();

        const updatedTasks = data.map(task => {
          const applied = task.applicants?.find(app => app.freelancerId === userData._id);
          return {
            ...task,
            hasApplied: !!applied,
            appliedDate: applied ? new Date(applied.appliedAt).toLocaleDateString() : null
          };
        });

        setTasks(updatedTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        (showAll || !task.hasApplied) &&
        (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === 'budget-asc') return a.budget - b.budget;
      if (sortOption === 'budget-desc') return b.budget - a.budget;
      if (sortOption === 'deadline-nearest') return new Date(a.deadline) - new Date(b.deadline);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const displayedTasks = filteredTasks.slice(0, visibleCount);

  const handleApply = async (task) => {
    if (task.hasApplied) return;
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${task._id}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          freelancerId,
          name: 'Freelancer X',
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("✅ Applied successfully!");
        setTasks(prev => prev.map(t => t._id === task._id ? { ...t, hasApplied: true, appliedDate: new Date().toLocaleDateString() } : t));
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to apply for task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <div className="flex items-center overflow-hidden h-16">
          <img src={logo} alt="dTask Logo" className="h-12 w-auto object-contain rounded-md" />
        </div>
        <nav className="flex items-center space-x-6 text-sm sm:text-base font-semibold text-gray-700">
          <Link to="/freelancer-landing" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/freelancer-dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
          <button onClick={handleLogout} className="hover:text-blue-600 transition">Logout</button>
        </nav>
      </header>

      <div className="bg-blue-50 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full sm:w-1/3 px-4 py-2 rounded-md border border-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showAll}
              onChange={() => setShowAll(prev => !prev)}
            />
            <span>Show Applied</span>
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded-md text-center"
          >
            <option value="latest"> Latest</option>
            <option value="budget-asc">💸 Budget: Low to High</option>
            <option value="budget-desc">💰 Budget: High to Low</option>
            <option value="deadline-nearest">⏳ Nearest Deadline</option>
          </select>
        </div>
      </div>

      <main className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-white">
        {displayedTasks.map((task, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="cursor-pointer bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition hover:-translate-y-1 hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-blue-700">{task.title}</h3>
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">🏅 Client</span>
            </div>
            <p className="text-gray-700 text-sm mb-3">{task.description}</p>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <span className="block">💰 {task.budget} ETH</span>
              <span className="block">🗓️ {task.deadline}</span>
              <div className="flex flex-wrap gap-2">
                {task.skills.map((skill, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              {task.hasApplied && (
                <span className="text-green-600 text-xs">✅ Applied on {task.appliedDate}</span>
              )}
            </div>
            <button
              disabled={task.hasApplied}
              onClick={() => handleApply(task)}
              className={`w-full py-2 rounded-md transition relative group ${
                task.hasApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {task.hasApplied ? "Applied" : "Apply Now"}
              {task.hasApplied && (
                <span className="absolute top-0 left-0 w-full text-center text-[10px] text-white bg-black bg-opacity-70 rounded-t-md opacity-0 group-hover:opacity-100 transition">
                  Already applied on {task.appliedDate}
                </span>
              )}
            </button>
          </motion.div>
        ))}
      </main>

      {visibleCount < filteredTasks.length && (
        <div className="text-center pb-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      <footer className="bg-gray-800 text-white text-center py-6 text-sm mt-auto">
        <div className="flex justify-center space-x-6 mb-2">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="https://github.com" className="hover:underline" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://discord.com" className="hover:underline" target="_blank" rel="noreferrer">Discord</a>
          <a href="/help" className="hover:underline">Help</a>
        </div>
        &copy; {new Date().getFullYear()} dTask. All rights reserved.
      </footer>
    </div>
  );
};

export default MarketplacePage;
