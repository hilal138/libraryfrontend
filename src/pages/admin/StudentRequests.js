import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { RefreshCw, CheckCircle, XCircle, Mail, Phone, BookOpen, AlertCircle, User, Book } from "lucide-react";

export default function StudentRequests() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null);
      const res = await API.get("/admin/pending-students");
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError(err.response?.data?.msg || "Failed to load student requests");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (id) => {
    try {
      await API.post("/admin/approve-student", { studentId: id });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to approve student");
    }
  };

  const reject = async (id) => {
    try {
      await API.post("/admin/reject-student", { studentId: id });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to reject student");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="animate-spin text-indigo-600" size={48} />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md mx-auto">
          <AlertCircle className="text-red-500 mx-auto mb-3" size={48} />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Data</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Student Requests</h1>
            <p className="text-gray-500 text-sm">
              {students.length === 0 
                ? "No pending requests" 
                : `${students.length} student(s) awaiting approval`}
            </p>
          </div>
          <button
            onClick={fetchData}
            className="p-2.5 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition shadow-lg"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {/* Empty State */}
        {students.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">All Caught Up!</h3>
            <p className="text-gray-500">No pending student registrations.</p>
          </div>
        ) : (
          /* Student Cards Grid */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {students.map((s) => (
              <div 
                key={s._id} 
                className="bg-white rounded-2xl p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 truncate max-w-[150px]">{s.name}</h3>
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Card Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate text-xs">{s.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span>{s.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-indigo-600 font-medium">
                    <Book className="w-4 h-4 flex-shrink-0" />
                    <span>{s.enrollmentNo}</span>
                  </div>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 mt-2">
                    <div>
                      <p className="text-xs text-gray-400">Faculty</p>
                      <p className="font-medium text-gray-800 text-sm truncate">{s.faculty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Class</p>
                      <p className="font-medium text-gray-800 text-sm">{s.class}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => approve(s._id)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2.5 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition font-medium flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg text-sm"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                  <button
                    onClick={() => reject(s._id)}
                    className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition font-medium flex items-center justify-center gap-1.5 text-sm"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}