import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { type Student } from "../types";

function StudentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState<Student | null>(null);
    const [form, setForm] = useState({ fname: "", lname: "", rollno: "", age: "", class_name: "", grade: "" });

    useEffect(() => {
        api.get(`/students/${id}/`).then((res) => {
            setStudent(res.data);
            setForm(res.data);
        });
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = () => {
        api
            .put(`/students/${id}/`, form)
            .then(() => {
                alert("Student updated!");
                navigate("/");
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    const errorData = err.response.data;
                    const messages = Object.entries(errorData)
                        .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
                        .join("\n");
                    alert(messages);
                } else {
                    alert("Something went wrong.");
                }
            });
    };

    const handleDelete = () => {
        api.delete(`/students/${id}/`).then(() => {
            alert("Student deleted!");
            navigate("/");
        });
    };

    if (!student) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            {["fname", "lname", "rollno", "age", "class_name", "grade"].map((field) => (
                <input
                    key={field}
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className="block w-full mb-3 p-2 border rounded"
                />
            ))}
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            <button type="button"
                onClick={() => navigate("/")}
                className="ml-4 mb-4 text-sm text-blue-600 underline hover:text-blue-800"
            >← Back to Home</button>
        </div>
    );
}

export default StudentDetail;
