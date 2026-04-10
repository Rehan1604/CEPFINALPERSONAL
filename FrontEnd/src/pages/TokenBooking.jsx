import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

export default function TokenBooking() {
  const [form, setForm] = useState({
    patientName: "",
    patientAge: "",
    hospitalId: 1, // default for now
    riskLevel: "medium",
  });

  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await API.post("/tokens", form);

      setTokenData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Token creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative px-6 py-12 lg:py-20 transition-colors duration-500 overflow-hidden flex items-center justify-center">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-cyan-400/20 dark:bg-cyan-500/10 blur-[120px] rounded-full animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-600/10 blur-[100px] rounded-full animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* LEFT COLUMN - FORM */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-panel rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-white/50 dark:border-white/10"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-slate-900 dark:text-white tracking-tight">
            Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Emergency Token</span>
          </h1>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 ml-1">Patient Name</label>
              <input
                placeholder="John Doe"
                className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                onChange={(e) =>
                  setForm({ ...form, patientName: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 ml-1">Age</label>
                <input
                  type="number"
                  placeholder="E.g. 45"
                  className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
                  onChange={(e) =>
                    setForm({ ...form, patientAge: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 ml-1">Risk Level</label>
                <select
                  className="w-full px-5 py-4 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium appearance-none cursor-pointer"
                  onChange={(e) =>
                    setForm({ ...form, riskLevel: e.target.value })
                  }
                  defaultValue="medium"
                >
                  <option value="low">🟡 Low</option>
                  <option value="medium">🟠 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 mt-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Generate Token"
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - RESULT */}
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <AnimatePresence mode="wait">
            {!tokenData ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                className="text-slate-500 dark:text-slate-400 text-xl font-medium tracking-wide flex flex-col items-center gap-4 opacity-60"
              >
                <div className="w-24 h-24 rounded-full border border-dashed border-slate-400 dark:border-white/20 flex items-center justify-center text-3xl">
                  ⌛
                </div>
                Fill details to generate token
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                className="w-full"
              >
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-emerald-500 rounded-[3rem] blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  
                  <div className="relative glass-panel rounded-[2.5rem] p-10 border border-white/50 dark:border-white/20 shadow-2xl text-center overflow-hidden">
                    {/* Confetti-like background particles could go here */}

                    <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center gap-2">
                       Token Generated <span className="text-emerald-500">🎉</span>
                    </h2>

                    <div className="mb-8">
                      <p className="text-sm uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400 mb-2">
                        Token Number
                      </p>
                      <motion.h1 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="text-7xl font-black text-slate-800 dark:text-white"
                      >
                        {tokenData.tokenNumber}
                      </motion.h1>
                    </div>

                    <div className="bg-slate-100/50 dark:bg-white/5 rounded-2xl p-6 border border-white/30 dark:border-white/5 mb-6">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                        Estimated Wait
                      </p>
                      <h3 className="text-4xl font-extrabold text-cyan-600 dark:text-cyan-400">
                        {tokenData.estimatedTime} <span className="text-2xl font-bold text-slate-500">mins</span>
                      </h3>
                    </div>

                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-start gap-2 justify-center">
                      <span className="text-blue-500 mt-0.5">ℹ️</span>
                      <span className="max-w-[250px] text-left">
                        Hospital Queue is dynamically managed. Please reach there on time matching your estimate.
                      </span>
                    </p>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}