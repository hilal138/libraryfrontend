import { useEffect, useState } from "react";
import API from "../../services/api";
import LibrarianLayout from "./LibrarianLayout";
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

export default function ReturnRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/librarian/return-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch return requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const acceptReturn = async (id) => {
    if (!window.confirm("Confirm this book has been returned?")) return;
    try {
      await API.post("/librarian/accept-return", { transactionId: id });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to accept return");
    }
  };

  const rejectReturn = async (id) => {
    if (!window.confirm("Reject this return request? The book status will remain issued.")) return;
    try {
      await API.post("/librarian/reject-return", { transactionId: id });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to reject return");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <LibrarianLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-green-600" size={48} />
        </div>
      </LibrarianLayout>
    );
  }

  return (
    <LibrarianLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Return Requests </h1>
            <p className="text-gray-500 text-sm">Process student book returns</p>
          </div>
          <button
            onClick={fetchData}
            className="p-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">All Caught Up! 🎉</h3>
            <p className="text-gray-500">No pending return requests at this time.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Student</th>
                    <th className="p-4 text-left font-semibold">Class</th>
                    <th className="p-4 text-left font-semibold">Enrollment</th>
                    <th className="p-4 text-left font-semibold">Book</th>
                    <th className="p-4 text-left font-semibold">Issue Date</th>
                    <th className="p-4 text-left font-semibold">Due Date</th>
                    <th className="p-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => {
                    const isOverdue = new Date(r.dueDate) < new Date();
                    return (
                      <tr key={r._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="p-4">
                          <div>
                            <p className="font-semibold text-gray-900">{r.studentId?.name || "Unknown"}</p>
                            <p className="text-sm text-gray-500">{r.studentId?.email || ""}</p>
                          </div>
                        </td>
                        <td className="p-4 text-gray-700">{r.studentId?.class || "-"}</td>
                        <td className="p-4 text-gray-700">{r.studentId?.enrollmentNo || "-"}</td>
                        <td className="p-4">
                          <span className="font-medium text-blue-600">{r.bookId?.title || "Unknown"}</span>
                        </td>
                        <td className="p-4 text-gray-700">
                          {r.issueDate ? new Date(r.issueDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className={isOverdue ? "text-red-500" : "text-gray-400"} />
                            <span className={isOverdue ? "text-red-600 font-semibold" : "text-gray-700"}>
                              {r.dueDate ? new Date(r.dueDate).toLocaleDateString() : "Not set"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => acceptReturn(r._id)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-600 hover:text-white transition font-medium"
                            >
                              <CheckCircle size={16} />
                              Accept
                            </button>
                            <button
                              onClick={() => rejectReturn(r._id)}
                              className="flex items-center gap-1.5 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition font-medium"
                            >
                              <XCircle size={16} />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LibrarianLayout>
  );
}
