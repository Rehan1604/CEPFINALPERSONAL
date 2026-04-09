import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 ADD THIS FUNCTION (YOU WERE MISSING THIS)
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Save token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🎉");

      // ✅ Redirect
      navigate("/home");
    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 relative overflow-hidden">
      
      <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl bg-blue-500/20"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-cyan-400/20"></div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Welcome Back
          </motion.h1>

          <p className="text-slate-300 mb-8">
            Sign in to access emergency routing and live hospital status
          </p>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-300 outline-none focus:ring-2 focus:ring-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              onClick={handleLogin}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </div>

          <div className="mt-6 text-sm text-slate-300 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-400 cursor-pointer"
            >
              Sign up
            </span>
          </div>

        </div>
      </motion.div>
    </div>
  );
}