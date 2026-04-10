import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const symptomsData = [
  { key: "chestPain", label: "Chest Pain", weight: 3, icon: "🫀" },
  { key: "breathing", label: "Breathing Difficulty", weight: 3, icon: "🫁" },
  { key: "bleeding", label: "Heavy Bleeding", weight: 2, icon: "🩸" },
  { key: "trauma", label: "Accident / Trauma", weight: 2, icon: "🚑" },
  { key: "fever", label: "High Fever", weight: 1, icon: "🌡️" },
  { key: "unconscious", label: "Unconsciousness", weight: 4, icon: "⚠️" },
];

export default function Triage() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState(
    Object.fromEntries(symptomsData.map((s) => [s.key, false]))
  );
  const [loading, setLoading] = useState(false);

  const toggle = (key) => {
    setSymptoms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateSeverity = () => {
    let score = 0;
    symptomsData.forEach((s) => {
      if (symptoms[s.key]) score += s.weight;
    });

    if (score >= 6) return "HIGH";
    if (score >= 3) return "MEDIUM";
    return "LOW";
  };

  const severity = calculateSeverity();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const res = await API.post("/triage", {
            severity: severity.toLowerCase(),
            symptoms,
            latitude: lat,
            longitude: lng,
          });

          localStorage.setItem("triageData", JSON.stringify(res.data));

          if (severity === "LOW") {
            alert("Low severity detected. Home care advised.");
            navigate("/home");
          } else {
            navigate("/hospitals");
          }
        },
        (error) => {
          console.error("Location error:", error);
          alert("Location access required");
          setLoading(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert("Triage failed");
      setLoading(false);
    }
  };

  const getSeverityStyles = () => {
    if (severity === "HIGH") return "text-red-600 dark:text-red-400 shadow-red-500/50";
    if (severity === "MEDIUM") return "text-amber-500 dark:text-yellow-400 shadow-yellow-500/50";
    return "text-emerald-600 dark:text-green-400 shadow-green-500/50";
  };

  return (
    <div className="min-h-screen relative px-6 py-12 lg:py-20 overflow-hidden transition-colors duration-500">
      {/* Background orbs */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-400/20 dark:bg-cyan-500/10 blur-[100px] top-0 left-0 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
      <div className="absolute w-[600px] h-[600px] bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px] bottom-0 right-0 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side - Symptoms */}
        <div className="lg:col-span-7 xl:col-span-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Emergency Check</span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg lg:text-xl max-w-2xl">
            Select all currently active symptoms. Our AI triage system will instantly evaluate priority and find the best route.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {symptomsData.map((s, i) => (
              <motion.div
                key={s.key}
                onClick={() => toggle(s.key)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-3xl cursor-pointer border-2 transition-all duration-300 font-medium text-lg flex items-center justify-between ${
                  symptoms[s.key]
                    ? "bg-cyan-50 dark:bg-cyan-900/40 border-cyan-400 shadow-[0_8px_30px_rgba(34,211,238,0.3)] text-cyan-900 dark:text-cyan-100"
                    : "glass-panel border-white/50 dark:border-white/10 hover:border-cyan-300/50 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span>{s.label}</span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    symptoms[s.key]
                      ? "bg-cyan-500 border-cyan-500"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  {symptoms[s.key] && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 xl:col-span-4 lg:sticky top-10"
        >
          <div className="glass-panel border border-white/40 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            {/* Inner glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            
            <div className="relative">
              <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-slate-200 uppercase tracking-wider text-center">
                Live Assessment
              </h2>

              <div className="flex flex-col items-center justify-center py-6">
                <motion.div
                  key={severity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-xl mb-6 ${getSeverityStyles()}`}
                >
                  {severity}
                </motion.div>
                <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-8">
                  <motion.div
                    className={`h-full rounded-full ${
                       severity === "HIGH" ? "bg-red-500" : severity === "MEDIUM" ? "bg-amber-400" : "bg-emerald-500"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: severity === "HIGH" ? "100%" : severity === "MEDIUM" ? "66%" : "33%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-white/40 dark:bg-black/20 rounded-2xl p-6 mb-8 border border-white/30 dark:border-white/5">
                <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-center text-sm lg:text-base">
                  Based on your symptoms, we are actively determining the optimal routing strategy and establishing emergency priority.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-4 lg:py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold shadow-[0_10px_30px_rgba(34,211,238,0.4)] hover:shadow-[0_15px_40px_rgba(34,211,238,0.6)] transition-all flex justify-center items-center gap-3"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Find Hospitals 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}