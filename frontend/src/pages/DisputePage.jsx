import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const DisputePage = () => {
  const { taskId } = useParams();

  const [disputeData, setDisputeData] = useState({
    disputeId: "DSP001",
    taskId: taskId || "",
    reason: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisputeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dispute Submitted:", disputeData);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-red-600">Dispute Task</h2>
      {submitted ? (
        <div className="text-green-600 font-semibold">
          Dispute has been submitted successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Dispute ID</label>
            <input
              type="text"
              name="disputeId"
              value={disputeData.disputeId}
              disabled
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Task ID</label>
            <input
              type="text"
              name="taskId"
              value={disputeData.taskId}
              disabled
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Reason</label>
            <input
              type="text"
              name="reason"
              value={disputeData.reason}
              onChange={handleChange}
              required
              placeholder="Enter reason for dispute"
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={disputeData.description}
              onChange={handleChange}
              required
              placeholder="Enter detailed description"
              className="w-full mt-1 p-2 border rounded"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit Dispute
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default DisputePage;