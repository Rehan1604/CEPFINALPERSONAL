import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden transition-colors duration-500">
      
      {/* Admin specific darker / distinct background glow */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-rose-500/10 dark:bg-red-600/10 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel rounded-[2rem] p-10 border border-slate-300 dark:border-white/10 shadow-2xl relative overflow-hidden group">
          {/* Distinct top border indicating admin access */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500"></div>

          <div className="text-center mb-10 mt-2">
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-white/10 shadow-inner">
              <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Secure staff login
            </p>
          </div>

          <div className="space-y-5">
            <input
              type="email"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              placeholder="Admin Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
              placeholder="Secure Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-red-600 dark:to-orange-600 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-lg shadow-lg dark:hover:shadow-red-500/30 transition-all flex justify-center items-center gap-2"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}