import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientApplicationsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/tasks/client-applicants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    fetchApplicants();
  }, [token]);

  const updateStatus = async (taskId, freelancerId, status) => {
    try {
      await axios.post(
        'http://localhost:4000/api/tasks/update-applicant-status',
        { taskId, freelancerId, status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplicants(prev =>
        prev.map(app =>
          app.taskId === taskId && app.freelancerId === freelancerId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Here are all applications.</h2>
      {applicants.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applicants.map(app => (
          <div
            key={app.taskId + app.freelancerId}
            className="bg-white shadow p-4 rounded mb-3 border"
          >
            <h4 className="text-lg font-bold">{app.taskTitle}</h4>
            <p className="text-sm text-gray-600">Freelancer: {app.name}</p>
            <p className="text-sm">
              Status:
              <span
                className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                  app.status === 'Accepted'
                    ? 'bg-green-200 text-green-800'
                    : app.status === 'Rejected'
                    ? 'bg-red-200 text-red-800'
                    : 'bg-yellow-200 text-yellow-800'
                }`}
              >
                {app.status}
              </span>
            </p>

            {app.status === 'Pending' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(app.taskId, app.freelancerId, 'Accepted')}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(app.taskId, app.freelancerId, 'Rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ClientApplicationsPage;
