import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff, User, Lock, BookOpen, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!form.email || !form.password) {
      setMessage("❌ Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await API.post("auth/login", {
        email: form.email,
        password: form.password
      });

      const { token, user } = res.data;
      console.log("Login successful:", { token: token.substring(0, 20) + "...", user });

      if (user.role !== form.role) {
        return setMessage("❌ Access Denied: Wrong role selected. You are a " + user.role + ".");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const routes = {
        admin: "/admin",
        librarian: "/librarian/requests",
        student: "/student"
      };
      
      window.location.href = routes[user.role] || "/";
    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.response?.data?.msg || err.message || "Login failed. Please check your credentials.";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Left Illustration Panel */}
      <div className="hidden lg:flex flex-col justify-center pr-12 pl-8 relative z-10">
        <div className="space-y-6 max-w-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <BookOpen className="text-white" size={32} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              AMU Library
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Welcome Back to Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Digital Library
            </span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Access your books, track your reading, and continue your academic journey.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Join <span className="font-semibold text-gray-700">10,000+</span> students already using the platform
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-100">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <BookOpen className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              AMU Library
            </span>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-8">Sign in to continue to your account</p>

          <div className="space-y-5">
            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Role Select */}
            <div className="relative">
              <select
                className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none bg-white appearance-none cursor-pointer transition-all"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="student"> Student</option>
                <option value="librarian"> Librarian</option>
                <option value="admin"> Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Error Message */}
            {message && (
              <div className={`p-3 rounded-lg text-center text-sm font-medium ${
                message.includes("❌") 
                  ? "bg-red-50 text-red-600 border border-red-200" 
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}>
                {message}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/register")}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
              >
                Create Account
                <ArrowRight size={16} />
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure • Encrypted • AMU Owned</span>
        </div>
      </div>
    </div>
  );
}
