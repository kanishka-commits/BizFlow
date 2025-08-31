import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import { FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

// Bounce animation for demo glass card
const demoBounce = {
  initial: { opacity: 0, scale: 0.92, y: 40 },
  animate: {
    opacity: 1,
    scale: 1.08,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 12 }
  },
  whileHover: {
    scale: 1.13,
    boxShadow: "0 16px 64px rgba(59,130,246,0.25)",
    transition: { type: "spring", stiffness: 340 }
  }
};

const glassVariants = {
  initial: { opacity: 0, scale: 0.95, y: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 }
  },
  whileHover: {
    scale: 1.03,
    boxShadow: "0 8px 32px rgba(59,130,246,0.15)",
    transition: { type: "spring", stiffness: 200 }
  }
};

// Floating tiny glass dots
const GlassDot = ({ isDarkMode, style }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 0.7, scale: 1 }}
    transition={{ duration: 1, delay: Math.random() * 1.5 }}
    whileHover={{ scale: 1.5, opacity: 1 }}
    className={`fixed z-30 rounded-full backdrop-blur-lg
      ${isDarkMode
        ? "bg-gradient-to-br from-blue-900 to-white/20"
        : "bg-gradient-to-br from-slate-300 to-slate-200"
      }`}
    style={{
      width: 14,
      height: 14,
      ...style,
    }}
  />
);

// Utility to generate random positions for dots
const generateDotPositions = () => {
  const positions = [];
  for (let i = 0; i < 10; i++) {
    positions.push({
      top: `${Math.random() * 90 + 5}vh`,
      left: `${Math.random() * 90 + 5}vw`,
    });
  }
  return positions;
};

const Partner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { isDarkMode } = useTheme();
  const [dotPositions] = useState(generateDotPositions());

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowPopup(true);

    // reset form after submit
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    });

    setTimeout(() => setShowPopup(false), 3000); // hide popup after 3s
  };

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      animate="show"
      className="pt-32 max-w-7xl mx-auto px-4 pb-24 relative"
    >
      {/* Floating tiny glass dots - behind form */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {dotPositions.map((pos, idx) => (
          <GlassDot key={idx} isDarkMode={isDarkMode} style={pos} />
        ))}
      </div>

      <motion.h1
        variants={textVariant(0.3)}
        whileHover={{ scale: 1.13, transition: { type: "spring", stiffness: 340 } }}
        className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent cursor-pointer"
      >
        Become a Partner
      </motion.h1>

      <motion.p
        variants={fadeIn("up", 0.4)}
        whileHover={{ scale: 1.09, transition: { type: "spring", stiffness: 320 } }}
        className={`text-lg text-center max-w-2xl mx-auto mb-12 cursor-pointer
          ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        Join hands with us to grow together. Fill out the form below, and our
        team will reach out soon!
      </motion.p>

      {/* Form with glassmorphism and bounce animation */}
      <motion.form
        onSubmit={handleSubmit}
        variants={glassVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        className={`backdrop-blur-3xl rounded-2xl p-10 max-w-2xl mx-auto space-y-6 border
          ${isDarkMode
            ? "bg-white/10 text-white border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
            : "bg-white/60 text-gray-900 border-gray-200 shadow-[0_0_30px_rgba(59,130,246,0.12)]"
          }`}
        style={{
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(59,130,246,0.10), 0 1.5px 8px rgba(255,255,255,0.08)"
            : "0 8px 32px rgba(59,130,246,0.10), 0 1.5px 8px rgba(59,130,246,0.08)"
        }}
      >
        {/* Name */}
        <div>
          <label
            className={`block font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2
              ${isDarkMode
                ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-pink-400"
                : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-pink-400"
              }`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            className={`block font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2
              ${isDarkMode
                ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-purple-400"
                : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-purple-400"
              }`}
            required
          />
        </div>

        {/* Company */}
        <div>
          <label
            className={`block font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2
              ${isDarkMode
                ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-blue-400"
                : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-blue-400"
              }`}
          />
        </div>

        {/* Message */}
        <div>
          <label
            className={`block font-semibold mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your partnership proposal"
            rows="4"
            className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2
              ${isDarkMode
                ? "border-white/20 bg-gray-900/40 text-white placeholder-gray-300 focus:ring-indigo-400"
                : "border-gray-300 bg-white/80 text-gray-800 placeholder-gray-500 focus:ring-indigo-400"
              }`}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.09 }}
          className="w-full py-3 rounded-xl font-semibold text-lg
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            text-white shadow-lg hover:opacity-90 transition-all"
        >
          Submit
        </motion.button>
      </motion.form>

      {/* Contact Info Cards with glassmorphism and bounce */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
        {/* Address Card */}
        <motion.div
          variants={glassVariants}
          initial="initial"
          whileInView="animate"
          whileHover="whileHover"
          viewport={{ once: true, amount: 0.2 }}
          className={`group rounded-2xl p-6 backdrop-blur-2xl
            flex flex-col items-center text-center cursor-pointer
            ${isDarkMode
              ? "bg-white/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-white"
              : "bg-white/60 border border-gray-200 shadow-[0_0_30px_rgba(59,130,246,0.12)] text-gray-900"
            }`}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full
              bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg mb-4
              group-hover:shadow-[0_0_20px_rgba(59,130,246,0.7)]"
          >
            <FaMapMarkerAlt className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Our Address</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            123 BizFlow Street <br /> Mumbai, India
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.div
          variants={glassVariants}
          initial="initial"
          whileInView="animate"
          whileHover="whileHover"
          viewport={{ once: true, amount: 0.2 }}
          className={`group rounded-2xl p-6 backdrop-blur-2xl
            flex flex-col items-center text-center cursor-pointer
            ${isDarkMode
              ? "bg-white/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-white"
              : "bg-white/60 border border-gray-200 shadow-[0_0_30px_rgba(139,92,246,0.12)] text-gray-900"
            }`}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full
              bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg mb-4
              group-hover:shadow-[0_0_20px_rgba(147,51,234,0.7)]"
          >
            <FaEnvelope className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Email Us</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            contact@bizflow.com
          </p>
        </motion.div>

        {/* Phone Card */}
        <motion.div
          variants={glassVariants}
          initial="initial"
          whileInView="animate"
          whileHover="whileHover"
          viewport={{ once: true, amount: 0.2 }}
          className={`group rounded-2xl p-6 backdrop-blur-2xl
            flex flex-col items-center text-center cursor-pointer
            ${isDarkMode
              ? "bg-white/10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] text-white"
              : "bg-white/60 border border-gray-200 shadow-[0_0_30px_rgba(236,72,153,0.12)] text-gray-900"
            }`}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center justify-center w-12 h-12 rounded-full
              bg-gradient-to-r from-pink-500 to-red-500 shadow-lg mb-4
              group-hover:shadow-[0_0_20px_rgba(236,72,153,0.7)]"
          >
            <FaPhone className="text-white text-xl" />
          </motion.div>
          <h3 className="text-lg font-semibold mb-1">Call Us</h3>
          <p className="text-sm opacity-80 leading-relaxed">+91 98765 XXXXX</p>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2"
          >
            <FaCheckCircle className="text-white text-xl" />
            <span>Your request has been submitted!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Partner;
