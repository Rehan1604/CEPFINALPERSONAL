import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    try {
      const res = await API.get("/tokens/1");

      if (res.data.data && res.data.data.length > 0) {
        setToken(res.data.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelToken = async () => {
    if (!token) {
      alert("No token to cancel");
      return;
    }

    try {
      await API.put(`/tokens/${token.id}`, {
        status: "CANCELLED",
      });

      alert("Token cancelled successfully ❌");
      setToken(null);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel token");
    }
  };

  return (
    <div className="min-h-screen relative px-6 py-12 transition-colors duration-500 overflow-hidden">
      
      {/* Mesmerizing Background Orbs */}
      <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-cyan-400/20 dark:bg-cyan-500/10 blur-[120px] rounded-full animate-blob pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/10 blur-[100px] rounded-full animate-blob animation-delay-2000 pointer-events-none mix-blend-multiply dark:mix-blend-screen"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Dashboard</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 font-medium">
            Manage your emergency tokens and live status.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* TOKEN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-12 lg:col-span-4 glass-panel rounded-[2rem] p-1 shadow-2xl overflow-hidden relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/60 dark:bg-slate-900/80 backdrop-blur-xl rounded-[1.8rem] p-8 h-full flex flex-col justify-center items-center text-center border border-white/40 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest">
                Active Token
              </h2>

              {token ? (
                <>
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-40 h-40 rounded-full border-[6px] border-cyan-100 dark:border-cyan-900/50 flex items-center justify-center relative mb-6 shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                  >
                    <div className="absolute inset-0 rounded-full border-[6px] border-cyan-400 border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                    <h1 className="text-6xl font-black text-slate-800 dark:text-white">
                      {token.tokenNumber}
                    </h1>
                  </motion.div>

                  <div className="bg-slate-100/80 dark:bg-white/5 rounded-2xl w-full p-4 border border-slate-200 dark:border-white/10">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Estimation</p>
                    <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                      {token.estimatedTime} <span className="text-lg text-slate-500 dark:text-slate-500">mins</span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center opacity-60 my-10">
                  <div className="w-24 h-24 mb-4 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-3xl">🎫</div>
                  <p className="text-lg font-bold text-slate-600 dark:text-slate-300">No active token</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* STATUS CARDS */}
          <div className="md:col-span-12 lg:col-span-8 grid md:grid-cols-2 gap-8">
            
            {/* PROGRESS TRACKER */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel rounded-[2rem] p-8 border border-white/40 dark:border-white/10 shadow-xl"
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 mb-6">
                Queue Status
              </h2>

              <div className="space-y-4">
                {[
                  { icon: "🏥", text: "Hospital Assigned", active: true },
                  { icon: "⏱", text: "Waiting Time Updated", active: true },
                  { icon: "📍", text: "Route Optimized", active: true },
                  { icon: "👨‍⚕️", text: "Doctor Ready", active: false }
                ].map((item, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      item.active 
                        ? "bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/20 shadow-sm" 
                        : "bg-slate-50/40 dark:bg-transparent border border-slate-200 dark:border-white/5 opacity-50"
                    }`}
                  >
                    <div className="text-2xl bg-slate-100 dark:bg-slate-800 w-12 h-12 flex items-center justify-center rounded-xl shadow-inner">
                      {item.icon}
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.text}
                    </span>
                    {item.active && (
                      <div className="ml-auto flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* QUICK ACTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-panel rounded-[2rem] p-8 border border-white/40 dark:border-white/10 shadow-xl flex flex-col"
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500 dark:from-white dark:to-slate-400 mb-6">
                Quick Actions
              </h2>

              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <button
                  onClick={() => navigate("/hospitals")}
                  className="w-full py-4 rounded-2xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold transition-all shadow-sm"
                >
                  View Ranked Hospitals
                </button>

                <button
                  onClick={() => navigate("/triage")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  Create New Emergency
                </button>

                <button
                  onClick={handleCancelToken}
                  disabled={!token}
                  className={`w-full py-4 rounded-2xl font-bold transition-all ${
                    token 
                      ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40" 
                      : "bg-slate-100 dark:bg-white/5 text-slate-400 border border-transparent cursor-not-allowed"
                  }`}
                >
                  Cancel Current Token
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* EXTRA INSIGHTS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-panel rounded-[2rem] p-8 lg:p-10 border border-white/40 dark:border-white/10 shadow-xl relative overflow-hidden"
        >
          {/* subtle decorative element */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-400/10 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg shrink-0">
              🧠
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">
                Live System Insights
              </h2>
              <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-4xl">
                MediROUTE continuously monitors hospital load, traffic conditions,
                and patient urgency to ensure optimal routing. Your position in the queue
                is dynamically adjusted to minimize life-threatening delays.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}