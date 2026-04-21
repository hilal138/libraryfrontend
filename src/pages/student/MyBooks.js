import { useEffect, useState } from "react";
import API from "../../services/api";
import StudentLayout from "./StudentLayout";
import { RefreshCw, BookOpen, Clock, AlertTriangle } from "lucide-react";

export default function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, [user._id]);

  const fetchData = async () => {
    try {
      const res = await API.get(`/student/${user._id}`);
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  const requestReturn = async (transactionId) => {
    try {
      await API.post("/student/request-return", { transactionId });
      alert("✅ Return request sent to librarian!");
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send return request");
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      issued: "bg-blue-100 text-blue-700 border-blue-200",
      "return-requested": "bg-yellow-100 text-yellow-700 border-yellow-200",
      returned: "bg-gray-100 text-gray-600 border-gray-200"
    };
    const labels = {
      issued: "Issued",
      "return-requested": "Return Requested",
      returned: "Returned"
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.issued}`}>
        {labels[status] || status}
      </span>
    );
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-emerald-600" size={48} />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">My Books 📚</h1>
            <p className="text-gray-500 text-sm">Track your issued books and due dates</p>
          </div>
          <button
            onClick={fetchData}
            className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {books.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Books Issued</h3>
            <p className="text-gray-500">You haven't borrowed any books yet.</p>
            <a 
              href="/student/request" 
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              Browse Books
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Book</th>
                    <th className="p-4 text-left font-semibold">Issue Date</th>
                    <th className="p-4 text-left font-semibold">Due Date</th>
                    <th className="p-4 text-left font-semibold">Fine</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-gray-900">{b.bookId?.title || "Unknown"}</p>
                          <p className="text-sm text-gray-500">{b.bookId?.author || "Unknown Author"}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        {b.issueDate ? new Date(b.issueDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className={isOverdue(b.dueDate) ? "text-red-500" : "text-gray-400"} />
                          <span className={isOverdue(b.dueDate) ? "text-red-600 font-semibold" : "text-gray-700"}>
                            {b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "-"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-semibold ${b.fine > 0 ? "text-red-600" : "text-gray-500"}`}>
                          ₹{b.fine || 0}
                        </span>
                      </td>
                      <td className="p-4">
                        {getStatusBadge(b.status)}
                      </td>
                      <td className="p-4">
                        {b.status === "issued" && (
                          <button
                            onClick={() => requestReturn(b._id)}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition text-sm font-medium shadow-md hover:shadow-lg"
                          >
                            Request Return
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
