// 📁 FreelancerDashboard.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  LogOut,
  UserCircle,
  X,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import EscrowPage from "../pages/EscrowPage";
import DisputePage from "../pages/DisputePage";

const FreelancerDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("My Applications");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUser(data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (["My Applications", "Escrow"].includes(activeSection)) {
      const fetchTasks = async () => {
        try {
          const res = await fetch("http://localhost:4000/api/tasks", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) setTasks(data);
        } catch (err) {
          console.error("Task fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchTasks();
    }
  }, [activeSection, token]);

  const hasApplied = (task) =>
    task.applicants?.some((app) => app.freelancerId === user?._id);

  const renderTasks = (taskList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {taskList.map((task) => (
        <div key={task._id} className="bg-white border border-blue-100 shadow-lg rounded-xl p-5">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{task.description}</p>
          <p className="text-sm text-gray-500 mb-1"><strong>Budget:</strong> ${task.budget}</p>
          <p className="text-sm text-gray-500 mb-1"><strong>Deadline:</strong> {new Date(task.deadline).toLocaleDateString()}</p>
          <button disabled className="w-full px-4 py-2 rounded-lg bg-gray-400 text-white font-semibold cursor-not-allowed">
            Already Applied
          </button>
        </div>
      ))}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "My Applications":
        const appliedTasks = tasks.filter((task) => hasApplied(task));
        return appliedTasks.length ? renderTasks(appliedTasks) : <div className="text-lg">You haven't applied to any tasks yet.</div>;

      case "Escrow":
        return <EscrowPage />;

      case "Dispute":
        return <DisputePage />;

      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 font-inter relative">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="dTask Logo"
            className="h-10 w-auto rounded cursor-pointer"
            onClick={() => navigate("/marketplace")}
          />
        </div>
        <h1 className="text-2xl font-bold text-blue-700">
          Welcome {user?.fullName || "User"}
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            <Briefcase size={16} /> Marketplace
          </button>
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            <UserCircle size={16} />
            Your Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/";
            }}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 w-full px-4 md:px-8 py-6 gap-8">
        <aside className="w-64 bg-white/70 backdrop-blur border border-blue-100 rounded-xl shadow-md p-4 flex flex-col gap-4">
          <SidebarButton label="My Applications" icon={<FileText />} isActive={activeSection === "My Applications"} onClick={() => setActiveSection("My Applications")} />
          <SidebarButton label="Escrow" icon={<ShieldCheck />} isActive={activeSection === "Escrow"} onClick={() => setActiveSection("Escrow")} />
          <SidebarButton label="Dispute" icon={<AlertTriangle />} isActive={activeSection === "Dispute"} onClick={() => setActiveSection("Dispute")} />
        </aside>

        <section className="flex-1 bg-white/60 border border-blue-100 rounded-xl shadow-md p-6">
          {renderSection()}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} dTask. All rights reserved.
      </footer>

      {/* Profile Panel */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-700">Your Profile</h2>
              <button onClick={() => setShowProfile(false)} className="text-blue-600 hover:text-blue-800">
                <X size={22} />
              </button>
            </div>
            <div className="space-y-4">
              <div><strong>Name:</strong> {user?.fullName}</div>
              <div><strong>Email:</strong> {user?.email}</div>
              <div><strong>Phone:</strong> {user?.phone}</div>
              <div><strong>Role:</strong> {user?.role}</div>
              <div><strong>Wallet:</strong> {user?.walletAddress}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarButton = ({ label, icon, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border
      ${isActive ? "bg-blue-100 text-blue-800 border-blue-300 shadow" : "bg-white hover:bg-white/80 text-blue-700 border-blue-100"}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-medium">{label}</span>
  </motion.button>
);

export default FreelancerDashboard;
