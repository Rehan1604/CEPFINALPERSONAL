import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function TokenStatus() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(state?.token || null);
  const [hospital, setHospital] = useState(state?.hospital || null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isCancelled, setIsCancelled] = useState(token?.status === "CANCELLED");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (token.status === "CANCELLED") {
      setIsCancelled(true);
      return;
    }

    const calculateTimeLeft = () => {
      if (!token.expiresAt) return 0;
      const difference = new Date(token.expiresAt) - new Date();
      return difference > 0 ? difference : 0;
    };

    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    if (initialTime <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);

      if (time <= 0) {
        clearInterval(timer);
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [token, navigate]);

  const handleCancel = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/token/${token.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (!res.ok) throw new Error("Failed to cancel token");
      
      setIsCancelled(true);
      setToken({ ...token, status: "CANCELLED" });
      alert("Token has been cancelled successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel token.");
    }
  };

  const formatTime = (ms) => {
    if (ms === null || ms <= 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!token) return null;

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 overflow-hidden transition-colors duration-500">
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/20 mix-blend-multiply dark:mix-blend-screen rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 mix-blend-multiply dark:mix-blend-screen rounded-full blur-[120px] animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="glass-panel p-10 rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-slate-800 text-center relative overflow-hidden group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-2">
              Emergency Token
            </h1>
            <p className="text-slate-500 font-medium mb-8">
              Patient: <span className="font-bold text-slate-800 dark:text-slate-200">{token.patientName}</span>
            </p>

            <div className="bg-slate-100/50 dark:bg-white/5 rounded-3xl p-6 border border-slate-200/50 dark:border-white/10 mb-8 text-center shadow-inner">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-300 mb-1">
                Hospital Destination
              </h2>
              <p className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                {hospital?.name || "Selected Hospital"}
              </p>
            </div>

            <div className="mb-10">
              <p className="uppercase tracking-widest text-xs font-bold text-slate-400 mb-3">
                Token Expiration Timer
              </p>
              
              <AnimatePresence mode="wait">
                {isCancelled ? (
                  <motion.div
                    key="cancelled"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-black text-rose-500"
                  >
                    CANCELLED
                  </motion.div>
                ) : isExpired ? (
                  <motion.div
                    key="expired"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-rose-500"
                  >
                    <p className="text-4xl font-black mb-2">EXPIRED</p>
                    <p className="text-sm font-medium">Slot allocated to others.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    className="text-6xl font-black text-slate-800 dark:text-white flex justify-center items-center gap-2"
                  >
                    <span className="text-cyan-500 animate-pulse">⏳</span>
                    {formatTime(timeLeft)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isCancelled && !isExpired && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="w-full py-4 rounded-xl border-2 border-rose-500/20 text-rose-500 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all focus:ring-4 focus:ring-rose-500/20"
              >
                Cancel Token
              </motion.button>
            )}

            {(isCancelled || isExpired) && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/home")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-lg transition-all"
              >
                Return Home
              </motion.button>
            )}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
}
