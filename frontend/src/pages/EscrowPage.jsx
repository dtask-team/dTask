import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserCircle,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink,
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
  Hourglass,
  XCircle,
} from "lucide-react";

const EscrowPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [escrowData, setEscrowData] = useState({
    status: "in_progress",
    client: {
      name: "Garima",
      wallet: "0x123...abc",
    },
    freelancer: {
      name: "Ravi",
      wallet: "0xdef...456",
    },
    deliverables: [
      {
        id: 1,
        name: "Frontend Code",
        url: "ipfs://bafybeihxxyz...",
        type: "file",
        uploaded: "2025-07-21T10:30:00Z",
      },
      {
        id: 2,
        name: "GitHub Repo",
        url: "https://github.com/example/repo",
        type: "link",
        uploaded: "2025-07-21T11:00:00Z",
      },
    ],
    timeline: {
      created: "2025-07-18T12:00:00Z",
      funded: "2025-07-18T13:00:00Z",
      workSubmitted: "2025-07-21T10:30:00Z",
      deadline: "2025-07-25T23:59:00Z",
    },
    contractAddress: "0xescrowContractAddressHere",
    transactionHash: "0x123txnhash456",
  });

  const [userRole, setUserRole] = useState("client");
  const [showDispute, setShowDispute] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");

  const getStatusIcon = (status) => {
    switch (status) {
      case "in_progress":
        return <Hourglass className="text-yellow-500" />;
      case "completed":
        return <CheckCircle className="text-green-600" />;
      case "disputed":
        return <XCircle className="text-red-500" />;
      default:
        return <Hourglass className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Escrow Agreement</h1>
          <div className="flex items-center gap-3">
            {getStatusIcon(escrowData.status)}
            <span className="text-gray-700 capitalize">
              {escrowData.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Client</h3>
              <p>{escrowData.client.name}</p>
              <p className="text-xs text-gray-500">{escrowData.client.wallet}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Freelancer</h3>
              <p>{escrowData.freelancer.name}</p>
              <p className="text-xs text-gray-500">{escrowData.freelancer.wallet}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Deliverables</h3>
              <ul className="space-y-4">
                {escrowData.deliverables.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">Uploaded: {formatDate(item.uploaded)}</p>
                    </div>
                    <a
                      href={
                        item.url.startsWith("ipfs://")
                          ? `https://ipfs.io/ipfs/${item.url.split("ipfs://")[1]}`
                          : item.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline flex items-center space-x-1"
                    >
                      {item.type === "file" ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      <span>{item.type === "file" ? "Download" : "View"}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Calendar className="inline w-4 h-4 mr-2" /> Created: {formatDate(escrowData.timeline.created)}
                </li>
                <li>
                  <DollarSign className="inline w-4 h-4 mr-2" /> Funded: {formatDate(escrowData.timeline.funded)}
                </li>
                <li>
                  <FileText className="inline w-4 h-4 mr-2" /> Work Submitted: {formatDate(escrowData.timeline.workSubmitted)}
                </li>
                <li>
                  <Clock className="inline w-4 h-4 mr-2" /> Deadline: {formatDate(escrowData.timeline.deadline)}
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contract Info</h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Escrow Contract:</strong><br />
                <a
                  href={`https://etherscan.io/address/${escrowData.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {escrowData.contractAddress}
                </a>
              </p>
              <p className="text-sm text-gray-700">
                <strong>Txn Hash:</strong><br />
                <a
                  href={`https://etherscan.io/tx/${escrowData.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {escrowData.transactionHash}
                </a>
              </p>
              <div className="bg-yellow-50 text-yellow-700 text-xs mt-4 p-2 rounded-lg">
                <ShieldCheck className="inline w-4 h-4 mr-1" />
                All funds are secured by a smart contract until both parties fulfill their obligations.
              </div>
            </div>
          </div>
        </div>

        {showDispute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h2 className="text-lg font-semibold mb-4">Raise a Dispute</h2>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded p-2 text-sm"
                placeholder="Enter reason for dispute..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
                  onClick={() => setShowDispute(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                  onClick={() => {
                    console.log("Dispute reason:", disputeReason);
                    setShowDispute(false);
                  }}
                >
                  Submit Dispute
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EscrowPage;
