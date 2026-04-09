import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

export default function TokenBooking() {
  const [form, setForm] = useState({
    patientName: "",
    patientAge: "",
    hospitalId: 1, // default for now (can be dynamic later)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white px-6 py-10 relative overflow-hidden">
      
      {/* Glow Background */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-blue-600/20 blur-3xl bottom-10 right-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* LEFT FORM */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-6">
            Book <span className="text-cyan-400">Emergency Token</span>
          </h1>

          <div className="space-y-5">
            <input
              placeholder="Patient Name"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20"
              onChange={(e) =>
                setForm({ ...form, patientName: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Age"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20"
              onChange={(e) =>
                setForm({ ...form, patientAge: e.target.value })
              }
            />

            <select
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/20"
              onChange={(e) =>
                setForm({ ...form, riskLevel: e.target.value })
              }
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-semibold shadow-xl"
            >
              {loading ? "Processing..." : "Generate Token"}
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT RESULT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center"
        >
          {!tokenData ? (
            <div className="text-slate-400 text-lg">
              Fill details to generate token
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl w-full text-center">
              
              <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                Token Generated 🎉
              </h2>

              <p className="text-lg mb-2">
                Token Number
              </p>
              <h1 className="text-6xl font-bold mb-6">
                {tokenData.tokenNumber}
              </h1>

              <p className="text-slate-300 mb-2">
                Estimated Waiting Time
              </p>
              <h3 className="text-2xl font-semibold mb-6">
                {tokenData.estimatedTime} mins
              </h3>

              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-sm text-slate-400">
                  Hospital Queue is dynamically managed.
                  Please reach on time.
                </p>
              </div>

            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}