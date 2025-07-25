import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentDetail from "./pages/StudentDetail";
import StudentCreate from "./pages/StudentCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/student/create" element={<StudentCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
