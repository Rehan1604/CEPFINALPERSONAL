import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";

function App() {
  return (
    <Router>
      <Routes>
        {/* default first page */}
        <Route path="/" element={<Login />} />

        {/* other pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
      </Routes>
    </Router>
  );
}

export default App;