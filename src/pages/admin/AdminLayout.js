import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UserPlus, Users, BookOpen, LogOut, Menu, X, FileText } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "All Books", path: "/admin/books", icon: <BookOpen size={20} /> },
    { name: "All Students", path: "/admin/all-students", icon: <Users size={20} /> },
    { name: "All Librarians", path: "/admin/all-librarians", icon: <UserPlus size={20} /> },
    { name: "Issued Books", path: "/admin/issued", icon: <FileText size={20} /> },
    { name: "Student Requests", path: "/admin/requests", icon: <Users size={20} /> },
    { name: "Add Librarian", path: "/admin/add-librarian", icon: <UserPlus size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ item }) => (
    <Link
      to={item.path}
      onClick={() => setMobileMenuOpen(false)}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        isActive(item.path)
          ? "bg-white text-slate-800 font-semibold shadow-md"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 z-50 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <BookOpen className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold text-white">AMU Admin</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white/20 rounded-lg text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menu.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
            className="flex items-center gap-3 w-full p-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-800 to-slate-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:hidden ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menu.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={() => {
              localStorage.clear();
              window.location = "/";
            }}
            className="flex items-center gap-3 w-full p-3 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 mt-16 lg:mt-0">
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}