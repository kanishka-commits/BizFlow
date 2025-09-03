import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What services does your platform offer?",
    a: "Web design, automation, ad creatives, infographics, and more.",
  },
  {
    q: "How can I track my business performance?",
    a: "Real-time dashboards, KPIs, and detailed analytics reports.",
  },
  {
    q: "What are your pricing plans?",
    a: "Flexible plans from basic to enterprise. Check Pricing section for details.",
  },
  {
    q: "How do I schedule a consultation?",
    a: "Easily book online by selecting your preferred date and time.",
  },
  {
    q: "Do you offer custom solutions?",
    a: "Yes! Tailored solutions are available. Contact us to discuss requirements.",
  },
  {
    q: "Is there a trial or demo available?",
    a: "Yes! You can request a free trial or schedule a live demo to explore our platform before committing.",
  },
];

// Predefined decorative bulbs
const bulbs = [
  { size: 60, x: "10%", y: "15%", color: "#F87171" },
  { size: 40, x: "70%", y: "10%", color: "#FBBF24" },
  { size: 50, x: "30%", y: "70%", color: "#60A5FA" },
  { size: 35, x: "80%", y: "60%", color: "#34D399" },
  { size: 45, x: "50%", y: "30%", color: "#A78BFA" },
];

export default function FAQ() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  const bgGlass = isDarkMode
    ? "bg-gray-900/60 backdrop-blur-lg text-white border border-gray-700/50 shadow-xl"
    : "bg-white/60 backdrop-blur-lg text-gray-900 border border-gray-200/50 shadow-lg";

  return (
    <section
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-indigo-50"
      }`}
    >
      {/* Frosted Bulb Background */}
      {/* Frosted Bulb Background */}
      {bulbs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full z-0"
          style={{
            width: b.size * 1.5,
            height: b.size * 1.5,
            top: b.y,
            left: b.x,
            background: b.color,
            filter: "blur(40px)",
            opacity: 0.6,
            mixBlendMode: isDarkMode ? "screen" : "multiply",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <h2
          className={`text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode
              ? "from-white via-blue-300 to-white"
              : "from-blue-800 via-indigo-600 to-blue-800"
          }`}
        >
          Your Questions, Answered
        </h2>
        <p
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } text-lg`}
        >
          Explore our FAQ in an interactive and fun way. Click on a question to
          see the answer.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        <div
          className={`absolute left-5 top-0 bottom-0 w-1 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } rounded-full`}
        ></div>

        {faqs.map((faq, i) => (
          <div key={i} className="relative flex items-start mb-10">
            {/* Dot */}
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${
                isDarkMode ? "bg-blue-500" : "bg-indigo-500"
              } flex items-center justify-center text-white font-bold`}
            >
              {i + 1}
            </div>

            {/* Content */}
            <div className="ml-6 flex-1 cursor-pointer">
              <motion.div
                onClick={() => toggle(i)}
                className={`p-5 rounded-2xl border transition-shadow duration-300 ${bgGlass} hover:shadow-2xl flex justify-between items-center`}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <div className="ml-4">
                  {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </motion.div>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className={`mt-3 text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`max-w-4xl mx-auto mt-16 p-10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 ${bgGlass}`}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500">
            Still have questions?
          </h3>
          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } text-sm`}
          >
            Our team is ready to assist you. Reach out anytime!
          </p>
        </div>
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
  onClick={() => navigate("/contact")}
  className={`
    relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white 
    bg-gradient-to-r from-blue-600 to-blue-500
    backdrop-blur-md shadow-lg shadow-blue-500/30
    border border-blue-400/30
    transition-transform duration-300 transform hover:scale-105
    hover:from-blue-500 hover:to-blue-400
  `}
>
  {/* Animated shine effect */}
  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-50 
                   -translate-x-full group-hover:translate-x-0
                   transition-all duration-700 pointer-events-none rounded-xl"></span>

  <span className="relative flex items-center gap-2">
    Contact Support
    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </span>
</button>

          <button
            onClick={() => navigate("/help")}
            className={`px-6 py-3 rounded-xl border font-semibold transition-transform duration-300 transform hover:scale-105 ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Browse Help Center
          </button>
        </div>
      </motion.div>
    </section>
  );
}
