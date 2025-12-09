import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fusioner from "./pages/Fusioner";

export default function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fusioner" element={<Fusioner />} />
      </Routes>
    </BrowserRouter>
  );
}
