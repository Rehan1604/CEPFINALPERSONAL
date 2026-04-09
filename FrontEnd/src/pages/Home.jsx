import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const res = await fetch("http://localhost:5000/api/triage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: lat,
              longitude: lng,
              pain_level: 2,
            }),
          });

          const data = await res.json();

          // ✅ store for hospital page
          localStorage.setItem("triageData", JSON.stringify(data));

          setHospitals(data?.data?.nearestHospitals || []);
        } catch (err) {
          console.error(err);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold tracking-wide">
          Medi<span className="text-cyan-400">ROUTE</span>
        </h1>

        <div className="space-x-4">
          <Link to="/login" className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition">
            Login
          </Link>
          <Link to="/signup" className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-10 py-24 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-6xl font-bold leading-tight">
            Smart Emergency <br />
            <span className="text-cyan-400">Hospital Routing</span>
          </h1>

          <p className="mt-6 text-lg text-slate-300">
            Real-time routing based on distance + wait time.
          </p>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {loading && <p>Loading hospitals...</p>}

          {!loading && hospitals.length === 0 && (
            <p>No hospitals found</p>
          )}

          {hospitals.map((h, i) => (
            <div
              key={i}
              className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl"
            >
              <h2 className="text-xl font-semibold">{h.name}</h2>

              <p className="mt-2 text-slate-300">
                🚗 Travel: {h.travelTime?.toFixed(1)} mins
              </p>

              <p className="text-slate-300">
                🏥 Wait: {h.waitTime} mins
              </p>

              <p className="text-cyan-400 font-semibold">
                ⏱ Total: {h.totalTime?.toFixed(1)} mins
              </p>

              <Link
                to="/hospitals"
                className="inline-block mt-4 px-4 py-2 bg-cyan-500 rounded-lg"
              >
                View All
              </Link>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}