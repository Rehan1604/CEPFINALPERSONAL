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

      const res = await API.post("/auth/register", form);

      alert("Signup successful 🎉");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      
      {/* Exquisite Background */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-500/20 shadow-[0_0_100px_rgba(34,211,238,0.5)] rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/30 dark:bg-blue-600/20 shadow-[0_0_100px_rgba(59,130,246,0.5)] rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-lighten"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel rounded-[2.5rem] p-10 relative group">
          {/* Subtle neon border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

          <div className="relative bg-white/50 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/40 dark:border-white/10 shadow-2xl">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-8 text-center tracking-tight">
              Create Account
            </h1>

            <div className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
              />

              <motion.button
                onClick={handleSignup}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-center mt-8 font-medium">
              Already have an account?{" "}
              <span
                className="text-cyan-600 dark:text-cyan-400 font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}