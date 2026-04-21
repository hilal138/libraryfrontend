import { useEffect, useState } from "react";
import API from "../../services/api";
import LibrarianLayout from "./LibrarianLayout";

export default function PendingRequests() {
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    const res = await API.get("/librarian/pending-students");
    setStudents(res.data);
  };

  const approve = async (id) => {
    await API.post("/librarian/approve-student", { studentId: id });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LibrarianLayout>
      <h1 className="text-3xl font-bold mb-6">Pending Requests 🎓</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {students.map((s) => (
          <div
            key={s._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold">{s.name}</h2>
            <p className="text-gray-600">{s.email}</p>
            <p className="text-gray-600">{s.enrollmentNo}</p>

            <button
              onClick={() => approve(s._id)}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </LibrarianLayout>
  );
}