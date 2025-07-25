import { useEffect, useState } from "react";
import {type Student } from "../types";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students/").then((res) => setStudents(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student List</h1>
        <button
          onClick={() => navigate("/student/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Create Student
        </button>
      </div>

      <div className="space-y-3">
        {students.map((s) => (
          <Link to={`/student/${s.id}`} key={s.id} className="block p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition">
            <p className="font-semibold">{s.fname} {s.lname}</p>
            <p>Roll No: {s.rollno}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
