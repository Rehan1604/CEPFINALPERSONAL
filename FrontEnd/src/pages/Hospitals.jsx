import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [bookingId, setBookingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("triageData");

    if (stored) {
      const parsed = JSON.parse(stored);
      const hospitalList = parsed?.data?.nearestHospitals || [];
      setHospitals(hospitalList);
    }
  }, []);

  const handleBookToken = async (hospital) => {
    try {
      setBookingId(hospital.id);
      console.log("Booking for:", hospital);

      const userName = localStorage.getItem("userName") || "Guest Patient";
      const userStr = localStorage.getItem("user");
      const userId = userStr ? JSON.parse(userStr).id : null;
      const triageStr = localStorage.getItem("triageData");
      const triageAge = triageStr ? JSON.parse(triageStr)?.data?.patientDetails?.age : 25;
      const riskLevel = triageStr ? JSON.parse(triageStr)?.data?.triageCategory : "MEDIUM";

      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: hospital.id,
          patientName: userName,
          patientAge: parseInt(triageAge) || 25,
          riskLevel: riskLevel || "MEDIUM",
          travelTime: hospital.travelTime,
          userId: userId
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create token");
      }

      console.log("Token created:", data);
      navigate("/token-status", { state: { token: data.data, hospital: hospital } });
    } catch (err) {
      console.error("Token error:", err);
      alert("❌ Failed to book token");
    } finally {
      setBookingId(null);
    }
  };

  if (hospitals.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-800 dark:text-white transition-colors duration-500 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/20 dark:bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="glass-panel p-10 rounded-3xl z-10 flex flex-col items-center">
          <svg className="w-16 h-16 text-slate-400 mb-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p className="text-2xl font-bold tracking-tight">No hospitals found</p>
          <p className="text-slate-500 mt-2">Please complete triage first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative px-6 py-12 lg:py-20 transition-colors duration-500 overflow-hidden">
      {/* Exquisite Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-500/10 blur-[100px] rounded-full animate-blob mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white tracking-tight">
            Best Hospitals <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">For You</span> 🏥
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Based on your urgency and location, we've found the fastest routes and shortest wait times.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {hospitals.map((hospital, index) => (
              <motion.div
                key={hospital.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -5 }}
                className="glass-panel rounded-[2rem] border border-white/50 dark:border-white/10 p-1 group relative overflow-hidden shadow-xl"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-600/0 group-hover:from-cyan-400/20 group-hover:to-blue-600/20 transition-all duration-500"></div>
                
                <div className="bg-white/60 dark:bg-slate-900/80 backdrop-blur-md rounded-[1.8rem] p-6 h-full relative border border-white/50 dark:border-slate-800 flex flex-col">
                  
                  {/* Badge */}
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                      Top Choice
                    </div>
                  )}

                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 mb-6 group-hover:text-cyan-500 transition-colors">
                    {hospital.name}
                  </h2>

                  <div className="space-y-4 flex-grow text-slate-700 dark:text-slate-300 font-medium">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">📍</span> Distance
                      </div>
                      <span className="font-bold">{hospital.distance?.toFixed(2)} km</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500">🚗</span> Travel Time
                      </div>
                      <span className="font-bold">{hospital.travelTime?.toFixed(1)} mins</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500">🏥</span> Wait Time
                      </div>
                      <span className="font-bold">{hospital.waitTime} mins</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800/50">
                      <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold">
                        <span>⏱</span> Total Time
                      </div>
                      <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400">
                        {hospital.totalTime?.toFixed(1)} min
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Source: <span className="font-semibold text-slate-500 dark:text-slate-300">{hospital.source}</span>
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBookToken(hospital)}
                    disabled={bookingId === hospital.id}
                    className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 dark:from-cyan-500 dark:to-blue-600 hover:from-slate-800 hover:to-slate-700 dark:hover:from-cyan-400 dark:hover:to-blue-500 text-white font-bold text-lg shadow-lg hover:shadow-cyan-500/30 transition-all flex justify-center items-center gap-2"
                  >
                    {bookingId === hospital.id ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Booking...
                      </>
                    ) : (
                      "Book Now"
                    )}
                  </motion.button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}