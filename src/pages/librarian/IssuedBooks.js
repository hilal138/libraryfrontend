import { useEffect, useState } from "react";
import API from "../../services/api";
import LibrarianLayout from "./LibrarianLayout";
import { RefreshCw, BookOpen, Calendar, Clock } from "lucide-react";

export default function IssuedBooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/librarian/issued-books");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch issued books:", err);
    } finally {
      setLoading(false);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Issued Books </h1>
            <p className="text-gray-500 text-sm">Currently borrowed books tracking</p>
          </div>
          <button
            onClick={fetchData}
            className="p-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Books Issued</h3>
            <p className="text-gray-500">All books are currently in the library.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-600 to-teal-600 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Student</th>
                    <th className="p-4 text-left font-semibold">Class</th>
                    <th className="p-4 text-left font-semibold">Enrollment</th>
                    <th className="p-4 text-left font-semibold">Book</th>
                    <th className="p-4 text-left font-semibold">Issue Date</th>
                    <th className="p-4 text-left font-semibold">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => (
                    <tr key={d._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-gray-900">{d.studentId?.name || "Unknown"}</p>
                          <p className="text-sm text-gray-500">{d.studentId?.email || ""}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{d.studentId?.class || "-"}</td>
                      <td className="p-4 text-gray-700">{d.studentId?.enrollmentNo || "-"}</td>
                      <td className="p-4">
                        <span className="font-medium text-blue-600">{d.bookId?.title || "Unknown"}</span>
                      </td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          {d.issueDate ? new Date(d.issueDate).toLocaleDateString() : "-"}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className={new Date(d.dueDate) < new Date() ? "text-red-500" : "text-gray-400"} />
                          <span className={new Date(d.dueDate) < new Date() ? "text-red-600 font-semibold" : "text-gray-700"}>
                            {d.dueDate ? new Date(d.dueDate).toLocaleDateString() : "Not set"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LibrarianLayout>
  );
}