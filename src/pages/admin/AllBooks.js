import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import AdminLayout from "./AdminLayout";
import { RefreshCw, BookOpen, Plus, Minus } from "lucide-react";

export default function AdminAllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("books");
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = async (bookId) => {
    try {
      await API.post(`books/${bookId}/increment`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to increment quantity");
    }
  };

  const decrementQuantity = async (bookId) => {
    try {
      await API.post(`books/${bookId}/decrement`);
      fetchBooks();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to decrement quantity");
    }
  };

  useEffect(() => {
    fetchBooks();
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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">All Books</h1>
            <p className="text-gray-500 text-sm">View and manage library inventory</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/admin/add-book"
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              <Plus size={20} />
              Add Book
            </Link>
            <button
              onClick={fetchBooks}
              className="p-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg hover:shadow-xl"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {books.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-300 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Books Added Yet</h3>
            <p className="text-gray-500">Add your first book to get started.</p>
            <Link
              to="/admin/add-book"
              className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              <Plus size={20} />
              Add Book
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                  <tr>
                    <th className="p-4 text-left font-semibold">Title</th>
                    <th className="p-4 text-left font-semibold">Author</th>
                    <th className="p-4 text-left font-semibold">Quantity</th>
                    <th className="p-4 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b) => (
                    <tr key={b._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-4 font-semibold text-gray-900">{b.title}</td>
                      <td className="p-4 text-gray-700">{b.author}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-bold ${
                          b.quantity > 5 
                            ? "bg-emerald-100 text-emerald-700"
                            : b.quantity > 0 
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                          {b.quantity}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrementQuantity(b._id)}
                            disabled={b.quantity <= 0}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Decrease stock"
                          >
                            <Minus size={18} />
                          </button>
                          <button
                            onClick={() => incrementQuantity(b._id)}
                            className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition"
                            title="Increase stock"
                          >
                            <Plus size={18} />
                          </button>
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
