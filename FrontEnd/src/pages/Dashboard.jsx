import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); // ✅ ADD THIS

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

  // ✅ NEW: Cancel Token Handler
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white px-6 py-10 relative overflow-hidden">
      
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-10"
        >
          Patient <span className="text-cyan-400">Dashboard</span>
        </motion.h1>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* TOKEN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl text-center"
          >
            <h2 className="text-xl mb-4 text-slate-300">Current Token</h2>

            {token ? (
              <>
                <h1 className="text-6xl font-bold text-cyan-400">
                  {token.tokenNumber}
                </h1>

                <p className="mt-4 text-slate-400">Estimated Time</p>

                <p className="text-2xl font-semibold">
                  {token.estimatedTime} mins
                </p>
              </>
            ) : (
              <p className="text-slate-400">No active token</p>
            )}
          </motion.div>

          {/* STATUS CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h2 className="text-xl mb-6 text-slate-300">
              Queue Status
            </h2>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl">
                🏥 Hospital Assigned
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                ⏱ Waiting Time Updated
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                📍 Route Optimized
              </div>
            </div>
          </motion.div>

          {/* ACTION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h2 className="text-xl mb-6 text-slate-300">
              Quick Actions
            </h2>

            <div className="space-y-4">

              {/* ✅ FIXED BUTTONS */}
              <button
                onClick={() => navigate("/hospitals")}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
              >
                View Hospitals
              </button>

              <button
                onClick={() => navigate("/triage")}
                className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
              >
                Book New Token
              </button>

              <button
                onClick={handleCancelToken}
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
              >
                Cancel Token
              </button>

            </div>
          </motion.div>

        </div>

        {/* EXTRA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h2 className="text-2xl mb-6 text-cyan-400">
            Live System Insights
          </h2>

          <p className="text-slate-300 leading-7">
            MediROUTE continuously monitors hospital load, traffic conditions,
            and patient urgency to ensure optimal routing and reduced waiting time.
          </p>
        </motion.div>

      </div>
    </div>
  );
}