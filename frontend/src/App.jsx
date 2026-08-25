import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import ListingDetail from "./pages/ListingDetail";
import DesignerProfile from "./pages/DesignerProfile";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/profile/:email" element={<DesignerProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;