import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { RefreshCw, UserPlus, Mail, Calendar } from "lucide-react";

export default function AllLibrarians() {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLibrarians = async () => {
    try {
      setLoading(true);
      const res = await API.get("admin/all-librarians");
      setLibrarians(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch librarians:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrarians();
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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">All Librarians</h1>
            <p className="text-gray-500 text-sm">View all registered librarians</p>
          </div>
          <button
            onClick={fetchLibrarians}
            className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {librarians.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <UserPlus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Librarians Yet</h3>
            <p className="text-gray-500">No librarians have been added.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Name</th>
                    <th className="p-4 text-left font-semibold">Email</th>
                    <th className="p-4 text-left font-semibold">Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {librarians.map((librarian) => (
                    <tr key={librarian._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <UserPlus className="text-blue-600" size={18} />
                          </div>
                          <span className="font-semibold text-gray-900">{librarian.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-400" />
                          {librarian.email}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          {librarian.createdAt 
                            ? new Date(librarian.createdAt).toLocaleDateString()
                            : librarian._id
                              ? (() => {
                                  const ts = parseInt(librarian._id.toString().substring(0, 8), 16);
                                  return new Date(ts * 1000).toLocaleDateString();
                                })()
                              : "N/A"
                          }
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
    </AdminLayout>
  );
}
