import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import Dashboard from "./pages/Dashboard";
import TokenBooking from "./pages/TokenBooking";
import Triage from "./pages/Triage";
import AdminDashboard from "./pages/AdminDashboard";
import ThemeToggle from "./components/ThemeToggle";

import TokenStatus from "./pages/TokenStatus";

function App() {
  return (
    <Router>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/token-booking" element={<TokenBooking />} />
        <Route path="/token-status" element={<TokenStatus />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;