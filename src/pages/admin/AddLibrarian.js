import { useState } from "react";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { UserPlus, Mail, Lock, User, CheckCircle, AlertCircle } from "lucide-react";

export default function AddLibrarian() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!form.name || !form.email || !form.password) {
      setMsg(" Please fill all fields");
      return;
    }

    setLoading(true);
    try {
       await API.post("admin/add-librarian", form);
      setMsg(" Librarian added successfully");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMsg(err.response?.data?.msg || " Error adding librarian");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <UserPlus className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Add New Librarian
              </h1>
              <p className="text-gray-500 mt-2">Create librarian account credentials</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 outline-none transition-all"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 outline-none transition-all"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="Enter secure password"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-indigo-500 outline-none transition-all"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={add}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus size={20} />
                    Create Librarian Account
                  </>
                )}
              </button>

              {/* Message */}
              {msg && (
                <div className={`p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                  msg.includes("✅")
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}>
                  {msg.includes("✅") ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {msg}
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <p className="text-sm text-slate-600">
                <strong>Note:</strong> The librarian account will be created with immediate access.
                No approval required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}