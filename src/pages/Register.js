import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff, User, Mail, Lock, Phone, BookOpen, ArrowRight, CheckCircle } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    enrollmentNo: "",
    faculty: "",
    class: "",
    year: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({
      name: "",
      email: "",
      password: "",
      phone: "",
      enrollmentNo: "",
      faculty: "",
      class: "",
      year: ""
    });
  }, []);

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.phone || !form.enrollmentNo || !form.faculty || !form.class || !form.year) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res =        await API.post("auth/register", form);
      console.log("Registration response:", res.data);
      setMessage("✅ Registration request sent! Please wait for admin approval.");
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        enrollmentNo: "",
        faculty: "",
        class: "",
        year: ""
      });
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg = err.response?.data?.msg || err.message || "Registration failed";
      setMessage(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const inputField = (label, type, value, onChange, placeholder, icon) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{placeholder}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Student Registration 
            </h2>
            <p className="text-gray-500">
              Join AMU Digital Library • Registration requires admin approval
            </p>
          </div>

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-5">
            {inputField("Full Name", "text", form.name, (e) => setForm({ ...form, name: e.target.value }), "Full Name", <User className="text-gray-400" size={18} />)}
            {inputField("Email", "email", form.email, (e) => setForm({ ...form, email: e.target.value }), "Email", <Mail className="text-gray-400" size={18} />)}
            
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {inputField("Phone Number", "tel", form.phone, (e) => setForm({ ...form, phone: e.target.value }), "Phone", <Phone className="text-gray-400" size={18} />)}
            {inputField("Enrollment Number", "text", form.enrollmentNo, (e) => setForm({ ...form, enrollmentNo: e.target.value }), "Enrollment No", <BookOpen className="text-gray-400" size={18} />)}
            {inputField("Faculty", "text", form.faculty, (e) => setForm({ ...form, faculty: e.target.value }), "Faculty", null)}
            {inputField("Class", "text", form.class, (e) => setForm({ ...form, class: e.target.value }), "Class", null)}
            {inputField("Year", "text", form.year, (e) => setForm({ ...form, year: e.target.value }), "Year", null)}
          </div>

          {/* Submit */}
          <button
            onClick={register}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2 ${
              message.includes("✅")
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {message.includes("✅") && <CheckCircle size={18} />}
              {message}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/login")}
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
              >
                Sign In
                <ArrowRight size={16} />
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Your data is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
}