import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("userName", res.data.user.name);
      alert("Login successful 🎉");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden">
      
      {/* Exquisite Background */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-400/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel rounded-[2.5rem] p-10 relative group">
          {/* Subtle neon border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          
          <div className="relative bg-white/50 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/40 dark:border-white/10 shadow-2xl">
            
            <div className="text-center mb-10">
              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-3"
              >
                Welcome Back
              </motion.h1>

              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Sign in to access emergency routing
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-black/20 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <motion.button
                onClick={handleLogin}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </motion.button>
            </div>

            <div className="mt-8 text-center text-slate-600 dark:text-slate-400 font-medium font-inter">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-cyan-600 dark:text-cyan-400 cursor-pointer font-bold hover:underline"
              >
                Sign up
              </span>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}