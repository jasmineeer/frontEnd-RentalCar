import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Pelanggan from "./pages/Pelanggan";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/sign" element={<Login />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
      </Routes>
    </BrowserRouter>
  )
}
