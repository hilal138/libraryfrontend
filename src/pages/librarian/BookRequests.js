import { useEffect, useState } from "react";
import API from "../../services/api";
import LibrarianLayout from "./LibrarianLayout";
import { RefreshCw } from "lucide-react";

export default function BookRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setError(null);
      const res = await API.get("/librarian/book-requests");
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch book requests:", err);
      setError(err.response?.data?.msg || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await API.post("/librarian/approve-request", { transactionId: id });
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to approve request");
    }
  };

  const reject = async (id) => {
    try {
      await API.post("/librarian/reject-request", { transactionId: id });
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to reject request");
    }
  };

  useEffect(() => {
    fetchRequests();
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

  if (error) {
    return (
      <LibrarianLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={fetchRequests}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </LibrarianLayout>
    );
  }

  return (
    <LibrarianLayout>
      <h1 className="text-3xl font-bold mb-6">
        Book Requests 
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Enrollment</th>
              <th className="p-3">Book</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="p-3 font-medium">{r.studentId?.name || "N/A"}</td>
                <td>{r.studentId?.class || "N/A"}</td>
                <td>{r.studentId?.enrollmentNo || "N/A"}</td>
                <td className="text-blue-600 font-semibold">
                  {r.bookId?.title || "Unknown Book"}
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => approve(r._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reject(r._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="p-6 text-gray-500 text-center">
            No pending book requests
          </p>
        )}
      </div>
    </LibrarianLayout>
  );
}