import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
      {/* Animated Mesmerizing Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/30 dark:bg-cyan-500/20 rounded-full blur-[100px] animate-blob z-0 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 z-0 mix-blend-multiply dark:mix-blend-screen"></div>
      <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full blur-[90px] animate-blob animation-delay-4000 z-0 mix-blend-multiply dark:mix-blend-screen"></div>

      {/* Navbar */}
      <nav className="relative z-10 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 py-6 glass-panel border-x-0 border-t-0 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-4 sm:mb-0">
          Medi<span className="text-slate-900 dark:text-white">ROUTE</span>
        </h1>

        <div className="space-x-4 flex items-center">
          {token ? (
            <>
              <span className="text-slate-700 dark:text-slate-300 font-bold mr-4">
                Welcome, {userName || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-full border border-red-300 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all font-medium shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-all font-medium text-slate-800 dark:text-slate-200 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium shadow-lg hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-20 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.h1 
            className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Smart Emergency <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Hospital Routing
            </span>
          </motion.h1>

          <motion.p 
            className="mt-6 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Triage and real-time hospital routing based on urgency,
            distance, and predictive wait times.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10"
          >
             <Link
                to="/triage"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-lg hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative flex items-center gap-3">
                  Start Emergency Check 
                  <span className="group-hover:translate-x-1 transition-transform">🚑</span>
                </span>
             </Link>
          </motion.div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-panel rounded-3xl p-8 sm:p-10 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative h-full glass-panel border border-white/20 dark:border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              How It Works
            </h2>

            <div className="space-y-6">
              {[
                { step: "1", text: "Complete smart symptom triage" },
                { step: "2", text: "Get instant severity analysis" },
                { step: "3", text: "View best nearby ranked hospitals" },
                { step: "4", text: "Book an instant priority token" }
              ].map((item, i) => (
                <motion.div 
                  key={item.step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xl shadow-inner">
                    {item.step}
                  </div>
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}