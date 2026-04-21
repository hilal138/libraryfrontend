import { useEffect, useState } from "react";
import API from "../services/api";

export default function Student() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get(`/student/${user._id}`);
        setBooks(res.data);
      } catch (err) {
        console.log(err.response?.data?.msg || err.message);
      }
    };

    if (user?._id) {
      fetchBooks();
    }
  }, [user?._id]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 My Issued Books</h2>

      {books.length === 0 ? (
        <p>No books issued</p>
      ) : (
        books.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <p><strong>Book ID:</strong> {b.bookId}</p>
            <p><strong>Issue Date:</strong> {new Date(b.issueDate).toDateString()}</p>
            <p><strong>Due Date:</strong> {new Date(b.dueDate).toDateString()}</p>
            <p><strong>Return Date:</strong> {b.returnDate ? new Date(b.returnDate).toDateString() : "Not returned"}</p>
            <p><strong>Fine:</strong> ₹{b.fine}</p>
          </div>
        ))
      )}
    </div>
  );
}