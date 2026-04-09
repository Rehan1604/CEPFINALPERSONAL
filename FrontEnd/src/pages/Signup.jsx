import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      // ✅ CORRECT ROUTE (baseURL already has /api)
      const res = await API.post("/auth/register", form);

      console.log("Signup success:", res.data);

      alert("Signup successful 🎉");
      navigate("/");

    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl top-10 left-10 rounded-full"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl bottom-10 right-10 rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10"
      >
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Create Account
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:scale-[1.02] transition"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>

        </div>

        <p className="text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}