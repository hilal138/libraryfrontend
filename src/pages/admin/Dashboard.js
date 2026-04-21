import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { Book, Users, UserPlus, RefreshCw, FileText, TrendingUp, Clock, AlertCircle, ShoppingBag, Calendar, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalStudents: 0,
    totalLibrarians: 0,
    issuedBooks: 0,
    pendingStudents: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await API.get("admin/stats");
      setStats({
        totalBooks: res.data.totalBooks || 0,
        totalStudents: res.data.totalStudents || 0,
        totalLibrarians: res.data.totalLibrarians || 0,
        issuedBooks: res.data.issuedBooks || 0,
        pendingStudents: res.data.pendingStudents || 0
      });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, gradient, subtext, link }) => {
    return (
      <Link to={link} className={`block bg-gradient-to-br ${gradient} p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {subtext && <p className="text-xs text-white/70 mt-1">{subtext}</p>}
          </div>
          <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
            <Icon size={22} className="text-white" />
          </div>
        </div>
      </Link>
    );
  };

  const InfoCard = ({ title, icon: Icon, color, children, link }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${color}`}>
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('border-', 'bg-')}`}>
            <Icon size={20} className={color.replace('border-', 'text-')} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );

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
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome Back! </h1>
              <p className="text-slate-300">Here's what's happening in your library today</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Calendar size={18} />
              <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Books"
            value={stats.totalBooks}
            icon={Book}
            gradient="from-indigo-500 via-purple-500 to-indigo-600"
            subtext="In library catalog"
            link="/admin/books"
          />
          <StatCard
            title="Active Students"
            value={stats.totalStudents}
            icon={Users}
            gradient="from-cyan-500 via-teal-500 to-emerald-500"
            link="/admin/requests"
          />
          <StatCard
            title="Librarians"
            value={stats.totalLibrarians}
            icon={UserPlus}
            gradient="from-amber-500 via-orange-500 to-red-500"
            link="/admin/add-librarian"
          />
          <StatCard
            title="Currently Issued"
            value={stats.issuedBooks}
            icon={FileText}
            gradient="from-slate-500 via-slate-600 to-slate-700"
            link="/admin/issued"
          />
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Book Utilization */}
          <InfoCard title="Book Utilization" icon={TrendingUp} color="border-indigo-500">
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {stats.totalBooks > 0 ? Math.round((stats.issuedBooks / stats.totalBooks) * 100) : 0}%
            </p>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${stats.totalBooks > 0 ? (stats.issuedBooks / stats.totalBooks) * 100 : 0}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{stats.issuedBooks} of {stats.totalBooks} books are borrowed</p>
          </InfoCard>

          {/* Pending Approvals */}
          <InfoCard title="Pending Approvals" icon={Clock} color={stats.pendingStudents > 0 ? "border-amber-500" : "border-emerald-500"}>
            <p className="text-3xl font-bold text-gray-900 mb-2">{stats.pendingStudents}</p>
            <p className="text-sm text-gray-500 mb-3">
              {stats.pendingStudents > 0 ? "Students waiting for approval" : "No pending requests"}
            </p>
            {stats.pendingStudents > 0 && (
              <a
                href="/admin/requests"
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Review now <ArrowRight size={14} />
              </a>
            )}
          </InfoCard>

          {/* Quick Actions */}
          <InfoCard title="Quick Actions" icon={ShoppingBag} color="border-slate-600">
            <div className="space-y-2">
              <Link
                to="/admin/requests"
                className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <Users size={16} className="text-indigo-500" />
                <span>Review Student Requests</span>
              </Link>
              <Link
                to="/admin/add-librarian"
                className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm font-medium text-gray-700 hover:text-purple-600"
              >
                <UserPlus size={16} className="text-purple-500" />
                <span>Add New Librarian</span>
              </Link>
              <Link
                to="/admin/books"
                className="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-sm font-medium text-gray-700 hover:text-emerald-600"
              >
                <Book size={16} className="text-emerald-500" />
                <span>Manage Library Books</span>
              </Link>
            </div>
          </InfoCard>
        </div>

        {/* Activity Notice */}
        {(stats.issuedBooks > 0 || stats.pendingStudents > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {stats.pendingStudents > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-full">
                    <AlertCircle className="text-amber-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-800">{stats.pendingStudents} pending student request{stats.pendingStudents > 1 ? 's' : ''}</p>
                    <p className="text-sm text-amber-600">requires your attention</p>
                  </div>
                  <Link
                    to="/admin/requests"
                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              )}
              {stats.issuedBooks > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-full">
                    <Book className="text-emerald-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-800">{stats.issuedBooks} book{stats.issuedBooks > 1 ? 's' : ''} currently issued</p>
                    <p className="text-sm text-emerald-600">to students</p>
                  </div>
                  <Link
                    to="/admin/issued"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition text-sm font-medium"
                  >
                    View
                  </Link>
                </div>
              )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}