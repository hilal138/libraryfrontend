import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import AddLibrarian from "./pages/admin/AddLibrarian";
import StudentRequests from "./pages/admin/StudentRequests";
import AllStudents from "./pages/admin/AllStudents";
import AllLibrarians from "./pages/admin/AllLibrarians";
import AdminAllBooks from "./pages/admin/AllBooks";
import AdminIssuedBooks from "./pages/admin/IssuedBooks";
import LibrarianAddBook from "./pages/librarian/AddBook";
import MyBooks from "./pages/student/MyBooks";
import RequestBook from "./pages/student/RequestBook";
import BookRequests from "./pages/librarian/BookRequests";
import LibrarianAllBooks from "./pages/librarian/AllBooks";
import ReturnRequests from "./pages/librarian/ReturnRequests";
import IssuedBooksLibrarian from "./pages/librarian/IssuedBooks";
import AddBook from "./pages/librarian/AddBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-librarian" element={<AddLibrarian />} />
        <Route path="/admin/requests" element={<StudentRequests />} />
        <Route path="/admin/all-students" element={<AllStudents />} />
        <Route path="/admin/all-librarians" element={<AllLibrarians />} />
        <Route path="/admin/books" element={<AdminAllBooks />} />
        <Route path="/admin/issued" element={<AdminIssuedBooks />} />
        <Route path="/admin/add-book" element={<LibrarianAddBook />} />
        <Route path="/librarian" element={<Navigate to="/librarian/requests" replace />} />
        <Route path="/librarian/issued" element={<IssuedBooksLibrarian />} />
        <Route path="/librarian/add-book" element={<LibrarianAddBook />} />
        <Route path="/librarian/requests" element={<BookRequests />} />
        <Route path="/librarian/books" element={<LibrarianAllBooks />} />
        <Route path="/librarian/returns" element={<ReturnRequests />} />
        <Route path="/student" element={<MyBooks />} />
        <Route path="/student/request" element={<RequestBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;