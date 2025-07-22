import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  LogOut,
  X,
  Briefcase,
  FileText,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EscrowPage from "../pages/EscrowPage";
import DisputePage from "../pages/DisputePage";
import logo from "../assets/logo.png";

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [activeSection, setActiveSection] = useState("My Posted Jobs");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:4000/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signin";
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (error) {
      console.error("Task fetch error:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "My Posted Jobs") {
      fetchTasks();
    }
  }, [activeSection]);

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } else {
        const errData = await res.json();
        console.error("Delete failed:", errData.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "My Posted Jobs":
        return (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="relative p-4 border rounded-xl bg-white/90 shadow-md"
              >
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => alert(`Viewing task: ${task.title}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-md shadow-sm transition duration-150"
                  >
                    View Task
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-md shadow-sm transition duration-150"
                  >
                    Delete Task
                  </button>
                </div>
                <h3 className="text-lg font-bold text-blue-700 mb-1">
                  {task.title}
                </h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Budget: ${task.budget} | Deadline:{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  Skills: {task.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        );

      case "Escrow":
        return <EscrowPage />;
      case "Dispute":
        return <DisputePage />;
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800 font-inter overflow-x-hidden">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
        <div className="flex items-center space-x-4 overflow-hidden h-16">
          <img src={logo} alt="dTask Logo" className="h-12 w-auto object-contain rounded-md" />
        </div>
        <div className="flex-1 text-center text-2xl md:text-3xl font-bold text-blue-700 pl-12">
          {user ? `Welcome ${user.fullName}` : "Welcome"}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => (window.location.href = "/client-task")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Post Task
          </button>
          <button
            onClick={() => setShowProfilePanel(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            <UserCircle size={18} />
            Your Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="flex flex-1 w-full px-4 md:px-8 py-8 gap-8">
        <aside className="w-64 bg-white/60 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-4 flex flex-col gap-4">
          <SidebarButton
            label="My Posted Jobs"
            icon={<Briefcase />}
            isActive={activeSection === "My Posted Jobs"}
            onClick={() => setActiveSection("My Posted Jobs")}
          />
          <SidebarButton
            label="Escrow"
            icon={<ShieldCheck />}
            isActive={activeSection === "Escrow"}
            onClick={() => setActiveSection("Escrow")}
          />
          <SidebarButton
            label="Dispute"
            icon={<AlertTriangle />}
            isActive={activeSection === "Dispute"}
            onClick={() => setActiveSection("Dispute")}
          />
        </aside>

        <section className="flex-1 bg-white/50 border border-blue-100 rounded-2xl shadow-md p-6">
          {renderSection()}
        </section>
      </main>

      <AnimatePresence>
        {showProfilePanel && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl p-6 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-700">Your Profile</h2>
              <button
                onClick={() => setShowProfilePanel(false)}
                className="text-gray-600 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>
            {loading ? (
              <p className="text-center text-lg animate-pulse">Loading...</p>
            ) : user ? (
              <div className="space-y-2 text-gray-700">
                <p><strong>Full Name:</strong> {user.fullName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || "Not Provided"}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Wallet:</strong> {user.walletAddress || "Not Linked"}</p>
              </div>
            ) : (
              <p className="text-red-500">Error loading user details.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-gray-800 text-white text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} dTask. All rights reserved.
      </footer>
    </div>
  );
};

const SidebarButton = ({ label, icon, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all
      ${isActive
        ? "bg-blue-100 text-blue-800 border-blue-300 shadow"
        : "bg-white/60 hover:bg-white/80 text-blue-700 border-blue-100"}`}
  >
    <div className="text-xl">{icon}</div>
    <span className="font-semibold">{label}</span>
  </motion.button>
);

export default ClientDashboard;
