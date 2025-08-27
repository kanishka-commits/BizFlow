import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import heroImage from "../assets/hero-image.png";
import { trackButtonClick, trackNewsletterSignup } from "../utils/analytics";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSend = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setError("Please enter an email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setError("");
    console.log("Email to send:", email);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
    setEmail("");
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-44 pb-16 container mx-auto overflow-hidden bg-transparent"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 space-y-6 sm:space-y-8 md:space-y-12 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <div
            className={`flex items-center gap-3 w-fit px-6 py-3 rounded-full backdrop-blur-sm border transition-all cursor-pointer group relative overflow-hidden ${
              isDarkMode
                ? "hover:bg-gray-700/20 border-gray-700/30 hover:border-gray-600/40"
                : "hover:bg-gray-100/30 border-gray-200/30 hover:border-gray-300/40 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <motion.span
              className="text-blue-600 text-lg relative z-10"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ⭐
            </motion.span>
            <span
              className={`text-xs font-semibold relative z-10 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Jump start your growth
            </span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h1
            className={`text-4xl lg:text-5xl font-black leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            We boost the{" "}
            <motion.span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              growth
            </motion.span>{" "}
            for <br /> Startup to Fortune 500 Companies{" "}
            <motion.span
              className="inline-block ml-2 text-xl"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚀
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className={`text-base max-w-xl ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Get the most accurate leads,{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            sales training
          </span>{" "}
          and conversions, tools and more — all within the same billing.
        </motion.p>

        {/* Corrected Email Input and Button */}
        <motion.div variants={itemVariants} className="relative max-w-lg">
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <div className="relative flex-1 group">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsTyping(e.target.value.length > 0);
                }}
                placeholder="Enter your email address"
                whileFocus={{ scale: 1.02, y: -2 }}
                className={`w-full px-6 py-4 border-2 rounded-2xl text-sm font-medium bg-transparent transition-all duration-500 ${
                  isDarkMode
                    ? "border-gray-600/50 text-white placeholder-gray-400"
                    : "border-gray-300/50 text-gray-700 placeholder-gray-500"
                }`}
              />
              {email && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                  <motion.span
                    className={`text-sm ${
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                        ? "text-green-500"
                        : "text-orange-400"
                    }`}
                    animate={{
                      scale: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                        ? [1, 1.1, 1]
                        : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "✓" : "@"}
                  </motion.span>
                </motion.div>
              )}
            </div>

            <motion.button
              onClick={() => {
                trackButtonClick("Hero Newsletter Button");
                trackNewsletterSignup("hero_section");
                handleSend();
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.96 }}
              disabled={!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              className={`px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 shadow-xl group min-w-[120px] ${
                email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                  ? "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ? "Send 🚀"
                : "Enter Email"}
            </motion.button>
          </div>

          {/* Success and Error Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute -bottom-16 left-0 bg-red-500 text-white px-6 py-3 rounded-xl text-sm"
              >
                ⚠️ {error}
              </motion.div>
            )}
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute -bottom-16 left-0 bg-green-500 text-white px-6 py-3 rounded-xl text-sm"
              >
                ✅ Email sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Right image column is unchanged */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring", damping: 20 }}
        className="w-full md:w-1/2 mt-8 md:mt-0 pl-0 md:pl-12 relative"
        style={{
          transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)`,
        }}
      >
        <div className="relative">
          <motion.img
            src={heroImage}
            alt="Team meeting"
            className="rounded-2xl shadow-2xl border border-white/20"
            whileHover={{ scale: 1.02 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
