import { useEffect, useState } from "react";
import API from "../../services/api";
import StudentLayout from "./StudentLayout";
import { BookOpen } from "lucide-react";

export default function RequestBook() {
  const [books, setBooks] = useState([]);
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await API.get("/books");
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch books", err);
    }
  };

  const requestBook = async () => {
    if (!selected) {
      setMsg("❌ Please select a book");
      return;
    }

    setLoading(true);
    try {
      await API.post("/student/request-book", {
        studentId: user._id,
        bookId: selected
      });

      setMsg("✅ Request sent to librarian!");
      setSelected("");
      fetchBooks(); // Refresh quantities
    } catch (err) {
      const backendMsg = err.response?.data?.msg;
      setMsg(backendMsg ? `❌ ${backendMsg}` : "❌ Error sending request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Request Book 📩</h1>
          <p className="text-gray-500 text-sm">Select a book to request from the library</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Books
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-emerald-500 outline-none bg-white appearance-none cursor-pointer transition-all"
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="">Select a book...</option>
                  {books.map((b) => (
                    <option 
                      key={b._id} 
                      value={b._id}
                      disabled={b.quantity === 0}
                    >
                      {b.title} {b.quantity > 0 ? `(${b.quantity} available)` : "(Out of stock)"}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {selected && (
                <p className="mt-2 text-sm text-gray-500">
                  {books.find(b => b._id === selected)?.quantity > 0 
                    ? "✅ Book is available for request"
                    : "⚠️ This book is currently out of stock"}
                </p>
              )}
            </div>

            <button
              onClick={requestBook}
              disabled={!selected || loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <BookOpen size={20} />
                  Send Request
                </>
              )}
            </button>

            {msg && (
              <div className={`p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                msg.includes("✅")
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-600 border border-red-200"
              }`}>
                {msg.includes("✅") && <BookOpen size={18} />}
                {msg}
              </div>
            )}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 max-w-lg">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">{books.length}</p>
            <p className="text-xs text-gray-500">Total Books</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {books.filter(b => b.quantity > 0).length}
            </p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {books.filter(b => b.quantity === 0).length}
            </p>
            <p className="text-xs text-gray-500">Out of Stock</p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
