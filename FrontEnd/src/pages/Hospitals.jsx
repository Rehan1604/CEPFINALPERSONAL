import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);

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
      console.log("Booking for:", hospital);

      const res = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalId: hospital.id,
          patientName: "Test User",
          patientAge: 25,
          riskLevel: "MEDIUM",
        }),
      });

      const data = await res.json();

      console.log("Token created:", data);
      alert("✅ Token booked successfully!");
    } catch (err) {
      console.error("Token error:", err);
      alert("❌ Failed to book token");
    }
  };

  if (hospitals.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        No hospitals found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-8 py-10">
      <h1 className="text-5xl font-bold mb-10">
        Best Hospitals For You 🚑
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {hospitals.map((hospital, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold">
              {hospital.name}
            </h2>

            <p className="mt-4 text-slate-300">
              📍 {hospital.distance?.toFixed(2)} km
            </p>

            <p className="mt-2 text-slate-400">
              🚗 {hospital.travelTime?.toFixed(1)} mins
            </p>

            <p className="mt-2 text-slate-400">
              🏥 Wait: {hospital.waitTime} mins
            </p>

            <p className="text-cyan-400 font-bold mt-2">
              ⏱ Total: {hospital.totalTime?.toFixed(1)} mins
            </p>

            {/* ✅ FIXED BUTTON */}
            <button
              onClick={() => handleBookToken(hospital)}
              className="mt-6 w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
            >
              Book Token
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}