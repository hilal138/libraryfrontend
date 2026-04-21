import { Link, useLocation } from "react-router-dom";
import { Book, Send, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export default function StudentLayout({ children }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menu = [
    { name: "My Books", path: "/student", icon: <Book size={20} /> },
    { name: "Request Book", path: "/student/request", icon: <Send size={20} /> }
  ];

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ item }) => (
    <Link
      to={item.path}
      onClick={() => setMobileMenuOpen(false)}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        isActive(item.path)
          ? "bg-white text-emerald-700 font-semibold shadow-md"
          : "hover:bg-white/10 text-white/80 hover:text-white"
      }`}
    >
      {item.icon}
      <span>{item.name}</span>
    </Link>
  );

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-br from-emerald-600 to-emerald-800 z-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Book className="text-white" size={24} />
          </div>
          <span className="text-lg font-bold text-white">AMU Student</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white/20 rounded-lg text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-emerald-600 to-emerald-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Book className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Student Portal</h2>
              <p className="text-xs text-emerald-200">Library Access</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <NavLink key={item.path} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-emerald-500/30">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all"
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 mt-16 lg:mt-0">
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}