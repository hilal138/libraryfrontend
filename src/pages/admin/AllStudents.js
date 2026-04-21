import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { RefreshCw, Users, GraduationCap, BookOpen } from "lucide-react";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("admin/all-students");
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-emerald-600" size={48} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">All Students</h1>
            <p className="text-gray-500 text-sm">View all registered students</p>
          </div>
          <button
            onClick={fetchStudents}
            className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {students.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Students Yet</h3>
            <p className="text-gray-500">No students have been registered.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Enrollment No</th>
                    <th className="p-4 text-left font-semibold">Faculty</th>
                    <th className="p-4 text-left font-semibold">Class</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <GraduationCap className="text-emerald-600" size={18} />
                          </div>
                          <span className="font-semibold text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 font-mono text-sm">{student.enrollmentNo}</td>
                      <td className="p-4 text-gray-700">{student.faculty}</td>
                      <td className="p-4 text-gray-700">{student.class}</td>
                      <td className="p-4 text-gray-700 text-sm">{student.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          student.status === "approved" 
                            ? "bg-emerald-100 text-emerald-700"
                            : student.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
