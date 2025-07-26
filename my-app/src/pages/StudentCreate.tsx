import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function StudentCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        api
            .post("/students/", form)
            .then(() => {
                alert("Student created!");
                navigate("/");
            })
            .catch((err) => {
                if (err.response && err.response.data) {
                    const errorData = err.response.data;
                    const messages = Object.entries(errorData)
                        .map(([field, msgs]) => `${field}: ${(msgs)}`)
                        .join("\n");
                    alert(messages);
                } else {
                    alert("Something went wrong.");
                }
            });
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Create New Student</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {["fname", "lname", "rollno", "age", "class_name", "grade"].map((field) => (
                    <input
                        name={field}
                        onChange={handleChange}
                        placeholder={field}
                        className="block w-full p-2 border rounded"
                        required
                    />
                ))}
                <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
                    Submit
                </button>
                <button type="button"
                    onClick={() => navigate("/")}
                    className="ml-4 mb-4 text-sm text-blue-600 underline hover:text-blue-800"
                >
                    ← Back to Home
                </button>
            </form>
        </div>
    );
}

export default StudentCreate;
