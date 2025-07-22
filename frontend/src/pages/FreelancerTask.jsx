import React, { useState } from 'react';
import { Clock, DollarSign, User, FileText, CheckCircle, XCircle, Send, Upload, ExternalLink, AlertCircle } from 'lucide-react';

const FreelancerTask = () => {
  const [task, setTask] = useState({
    title: "Design a dApp UI",
    description: "Create a responsive UI using React & Tailwind for a Web3 project. The design should be modern, user-friendly, and include wallet connection, trading interface, and portfolio management components. Please ensure the UI is fully responsive and follows current Web3 design trends.",
    budget: "0.5 ETH",
    deadline: "3 Days",
    postedBy: "0x123...456",
    postedDate: "2024-07-10",
    skills: ["React", "Tailwind", "Web3"],
    ipfsFiles: ["https://ipfs.io/ipfs/QmExampleCID"],
    status: "open", // "open", "applied", "accepted", "rejected"
  });

  const [coverNote, setCoverNote] = useState("");
  const [workSubmission, setWorkSubmission] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyForTask = () => {
    if (!coverNote.trim()) {
      alert("Please write a cover note before applying!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setTask(prev => ({ ...prev, status: "applied" }));
      setCoverNote("");
      setIsSubmitting(false);
      alert("Application submitted successfully! The client will review your proposal.");
    }, 1000);
  };

  const handleSubmitWork = () => {
    if (!workSubmission.trim()) {
      alert("Please provide your work submission link!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setWorkSubmission("");
      setIsSubmitting(false);
      alert("Work submitted successfully! The client will review your submission.");
    }, 1000);
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "applied":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Applied
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Open
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                dTASK
              </div>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-800">Freelancer Dashboard</h1>
            </div>
            <div className="text-sm text-gray-600">
              Connected: 0xABC...123
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Task Details Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h2>
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-medium text-green-600">{task.budget}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{task.deadline}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Posted: {task.postedDate}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {getStatusBadge()}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Description</h3>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {task.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Posted By</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{task.postedBy}</p>
                <p className="text-sm text-gray-500">Client</p>
              </div>
            </div>
          </div>

          {task.ipfsFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Files</h3>
              <div className="space-y-2">
                {task.ipfsFiles.map((file, index) => (
                  <a
                    key={index}
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Project Requirements Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Open Status - Apply for Task */}
          {task.status === "open" && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Apply for This Task</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="coverNote" className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Note *
                  </label>
                  <textarea
                    id="coverNote"
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell the client why you're the perfect fit for this project. Highlight your relevant experience and skills..."
                  />
                </div>
                <button
                  onClick={handleApplyForTask}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Applying...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Apply for Task
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Applied Status */}
          {task.status === "applied" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application Submitted</h3>
              <p className="text-gray-600">
                Your application has been submitted successfully. The client will review your proposal and get back to you soon.
              </p>
            </div>
          )}

          {/* Accepted Status - Submit Work */}
          {task.status === "accepted" && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">Congratulations!</h3>
                </div>
                <p className="text-green-700 mt-1">
                  Your application has been accepted. You can now start working on this project.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Your Work</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="workSubmission" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Submission Link *
                  </label>
                  <textarea
                    id="workSubmission"
                    value={workSubmission}
                    onChange={(e) => setWorkSubmission(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste your IPFS link or provide details about your completed work..."
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Submission Guidelines</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Upload your completed work to IPFS and paste the link above. Make sure all deliverables are included and clearly organized.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleSubmitWork}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Work
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Rejected Status */}
          {task.status === "rejected" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Application Not Accepted</h3>
              <p className="text-gray-600 mb-4">
                Unfortunately, your application was not selected for this project. Don't worry - there are many other opportunities available!
              </p>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Browse Other Tasks
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2024 dTask. Decentralized freelance platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerTask;
