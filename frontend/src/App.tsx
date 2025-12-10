import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fusioner from "./pages/Fusioner";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

export default function App() 
{
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/fusioner"
          element={
            <ProtectedRoute>
              <Fusioner />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
