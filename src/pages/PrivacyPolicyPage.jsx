import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
    opacity: 0,
    x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1.2,
      delay: delay,
      ease: [0.25, 0.6, 0.3, 0.8],
    },
  },
});

const textVariant = (delay) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay: delay,
    },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const PrivacyPolicyPage = () => {
  const { isDarkMode } = useTheme();

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This includes your name, email address, and any other information you choose to provide."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted service providers who assist us in operating our website and conducting our business."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use SSL encryption for data transmission and store data on secure servers."
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Some features may not function properly if cookies are disabled."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us at privacy@company.com to exercise these rights or if you have any questions about this policy."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="text-center mb-16 pt-16"
        >
          {/* Privacy Badge */}
          <motion.div
            variants={fadeIn('down', 0.1)}
            initial="hidden"
            whileInView="show"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors ${
              isDarkMode
                ? "bg-blue-900/30 border border-blue-700/50"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <Shield className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <span className={`text-sm font-medium ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}>
              Your Privacy Matters
            </span>
          </motion.div>

          <motion.h1
            variants={textVariant(0.3)}
            initial="hidden"
            whileInView="show"
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Privacy{" "}
            <span className="text-blue-600 relative inline-block">
              Policy
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200/60"></span>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeIn('up', 0.4)}
            initial="hidden"
            whileInView="show"
            className={`text-lg md:text-xl max-w-3xl mx-auto transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We value your privacy and are committed to protecting your personal information. 
            This policy explains how we collect, use, and safeguard your data when you use our services.
          </motion.p>

          <motion.div
            variants={fadeIn('up', 0.5)}
            initial="hidden"
            whileInView="show"
            className={`inline-block mt-6 px-4 py-2 rounded-lg text-sm ${
              isDarkMode 
                ? "bg-gray-800 text-gray-300 border border-gray-700" 
                : "bg-gray-100 text-gray-600 border border-gray-200"
            }`}
          >
            Last updated: August 2025
          </motion.div>
        </motion.div>

        {/* Content Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ y: -4, scale: 1.005 }}
              className={`p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border ${
                isDarkMode
                  ? "bg-gray-800/70 border-gray-700 backdrop-blur-sm"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  className={`p-3 rounded-xl transition-colors ${
                    isDarkMode 
                      ? "bg-blue-900/30 text-blue-400" 
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {section.icon}
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    variants={textVariant(0.1)}
                    className={`text-2xl font-semibold mb-4 transition-colors ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {section.title}
                  </motion.h3>
                  <motion.p
                    variants={fadeIn('up', 0.2)}
                    className={`text-lg leading-relaxed transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {section.content}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className={`max-w-4xl mx-auto mt-16 p-8 rounded-2xl text-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30"
              : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50"
          }`}
        >
          <motion.h2
            variants={textVariant(0.2)}
            className={`text-3xl font-bold mb-4 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Questions About Your Privacy?
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className={`text-lg mb-8 transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            If you have any questions about this Privacy Policy or how we handle your data, 
            we're here to help.
          </motion.p>
          <motion.button
            variants={fadeIn('up', 0.4)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 font-medium"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;