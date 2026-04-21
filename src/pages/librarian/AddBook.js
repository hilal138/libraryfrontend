import { useState } from "react";
import API from "../../services/api";
import LibrarianLayout from "./LibrarianLayout";
import { BookOpen, Plus, CheckCircle } from "lucide-react";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    quantity: ""
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const addBook = async () => {
    if (!book.title || !book.author || !book.quantity) {
      setMsg("❌ Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const bookData = {
        ...book,
        quantity: Number(book.quantity)
      };

      await API.post("/books", bookData);
      setMsg("✅ Book added successfully to catalog");
      setBook({ title: "", author: "", quantity: "" });
    } catch (err) {
      setMsg("❌ " + (err.response?.data?.msg || "Error adding book"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LibrarianLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl mb-4 shadow-lg">
                <BookOpen className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Add New Book 
              </h1>
              <p className="text-gray-500 mt-2">Expand the library catalog with new titles</p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Book Title</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter book title"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all"
                      value={book.title}
                      onChange={(e) => setBook({ ...book, title: e.target.value })}
                    />
                  </div>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Author name"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all"
                      value={book.author}
                      onChange={(e) => setBook({ ...book, author: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Plus className="text-gray-400" size={18} />
                  </div>
                  <input
                    type="number"
                    placeholder="Number of copies"
                    min="1"
                    className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-green-500 outline-none transition-all"
                    value={book.quantity}
                    onChange={(e) => setBook({ ...book, quantity: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={addBook}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Plus size={20} />
                    Add to Catalog
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
                  {msg.includes("✅") && <CheckCircle size={18} />}
                  {msg}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
}