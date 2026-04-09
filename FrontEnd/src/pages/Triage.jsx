// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const symptomList = [
//   { key: "chestPain", label: "Chest Pain", icon: "❤️" },
//   { key: "breathing", label: "Breathing Difficulty", icon: "🫁" },
//   { key: "bleeding", label: "Heavy Bleeding", icon: "🩸" },
//   { key: "trauma", label: "Accident / Trauma", icon: "🚑" },
//   { key: "fever", label: "High Fever", icon: "🌡️" },
//   { key: "unconscious", label: "Unconsciousness", icon: "⚠️" },
// ];

// export default function Triage() {
//   const navigate = useNavigate();

//   const [symptoms, setSymptoms] = useState({
//     chestPain: false,
//     breathing: false,
//     bleeding: false,
//     trauma: false,
//     fever: false,
//     unconscious: false,
//   });

//   const toggleSymptom = (key) => {
//     setSymptoms((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const calculateSeverity = () => {
//     let score = 0;

//     if (symptoms.chestPain) score += 3;
//     if (symptoms.breathing) score += 3;
//     if (symptoms.bleeding) score += 2;
//     if (symptoms.trauma) score += 2;
//     if (symptoms.fever) score += 1;
//     if (symptoms.unconscious) score += 4;

//     if (score >= 6) return "high";
//     if (score >= 3) return "medium";
//     return "low";
//   };

//   const getSeverityColor = () => {
//     const severity = calculateSeverity();
//     if (severity === "high") return "text-red-400";
//     if (severity === "medium") return "text-yellow-400";
//     return "text-green-400";
//   };

//   const handleSubmit = async () => {
//     const severity = calculateSeverity();

//     try {
//       await API.post("/triage", { severity });
//       navigate("/hospitals");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to submit triage");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white px-6 py-10 overflow-hidden relative">
//       {/* Glow background */}
//       <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start"
//       >
//         {/* Left Side */}
//         <div>
//           <h1 className="text-5xl font-bold mb-3">
//             Emergency <span className="text-cyan-400">Assessment</span>
//           </h1>

//           <p className="text-slate-300 mb-8 text-lg">
//             Select all symptoms currently affecting the patient.
//           </p>

//           <div className="space-y-4">
//             {symptomList.map((item, index) => (
//               <motion.div
//                 key={item.key}
//                 initial={{ opacity: 0, x: -40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.08 }}
//                 onClick={() => toggleSymptom(item.key)}
//                 className={`cursor-pointer rounded-3xl p-5 border transition-all duration-300 ${
//                   symptoms[item.key]
//                     ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20"
//                     : "bg-white/5 border-white/10 hover:bg-white/10"
//                 }`}
//               >
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl">
//                     {item.icon} {item.label}
//                   </span>

//                   <div
//                     className={`w-5 h-5 rounded-full border-2 ${
//                       symptoms[item.key]
//                         ? "bg-cyan-400 border-cyan-400"
//                         : "border-white/40"
//                     }`}
//                   />
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Right Side */}
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-8 shadow-2xl"
//         >
//           <h2 className="text-3xl font-bold mb-6">
//             Live Severity Analysis
//           </h2>

//           <div className="mb-6">
//             <p className="text-slate-400 mb-2">Detected Priority</p>
//             <h3
//               className={`text-5xl font-bold uppercase ${getSeverityColor()}`}
//             >
//               {calculateSeverity()}
//             </h3>
//           </div>

//           <div className="bg-white/5 rounded-2xl p-5 mb-8">
//             <p className="text-slate-300 leading-8">
//               Based on symptoms selected, our smart triage engine will
//               route the patient to the most optimal nearby hospital.
//             </p>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleSubmit}
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-lg"
//           >
//             Continue to Hospital Routing
//           </motion.button>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }






import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const symptomsData = [
  { key: "chestPain", label: "Chest Pain", weight: 3 },
  { key: "breathing", label: "Breathing Difficulty", weight: 3 },
  { key: "bleeding", label: "Heavy Bleeding", weight: 2 },
  { key: "trauma", label: "Accident / Trauma", weight: 2 },
  { key: "fever", label: "High Fever", weight: 1 },
  { key: "unconscious", label: "Unconsciousness", weight: 4 },
];

export default function Triage() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState(
    Object.fromEntries(symptomsData.map(s => [s.key, false]))
  );

  const toggle = (key) => {
    setSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateSeverity = () => {
    let score = 0;

    symptomsData.forEach(s => {
      if (symptoms[s.key]) score += s.weight;
    });

    if (score >= 6) return "HIGH";
    if (score >= 3) return "MEDIUM";
    return "LOW";
  };

  const severity = calculateSeverity();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/triage", {
        severity: severity.toLowerCase(),
        symptoms,
      });

      console.log("Triage result:", res.data);

      // optional: store hospital from backend response
      localStorage.setItem("triageData", JSON.stringify(res.data));

      navigate("/hospitals");

    } catch (err) {
      console.error(err);
      alert("Triage failed");
    }
  };

  const severityColor =
    severity === "HIGH"
      ? "text-red-400"
      : severity === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white px-6 py-10 relative overflow-hidden">
      
      {/* glowing background */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Smart <span className="text-cyan-400">Emergency Check</span>
          </h1>

          <p className="text-slate-400 mb-8 text-lg">
            Select all symptoms. Our AI triage system will route you instantly.
          </p>

          <div className="space-y-4">
            {symptomsData.map((s, i) => (
              <motion.div
                key={s.key}
                onClick={() => toggle(s.key)}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`p-5 rounded-3xl cursor-pointer border transition-all ${
                  symptoms[s.key]
                    ? "bg-cyan-500/20 border-cyan-400 shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-between">
                  <span className="text-lg">{s.label}</span>
                  <div className={`w-5 h-5 rounded-full border ${
                    symptoms[s.key]
                      ? "bg-cyan-400 border-cyan-400"
                      : "border-white/30"
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6">Live Analysis</h2>

          <h3 className={`text-6xl font-bold mb-6 ${severityColor}`}>
            {severity}
          </h3>

          <p className="text-slate-300 mb-8 leading-7">
            Based on your symptoms, we are determining the optimal hospital
            and emergency priority.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSubmit}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold shadow-xl"
          >
            Continue to Hospitals →
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}