import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  const footerLinks = {
    company: [
      { name: 'About', href: '/#about' },
      { name: 'Terms of Use', href: '/terms-of-use' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'How it Works', href: '/#SCHEDULE' },
      { name: 'Contact Us', href: '/contact' },
    ],
    getHelp: [
      { name: 'Support Career', href: '/support-career' },
      { name: '24h Service', href: '/#services' },
      { name: 'Quick Chat', href: '/quick-chat' },
    ],
    support: [
      { name: 'FAQs', href: '/faqs' },
      { name: 'Policy', href: '/policy' },
      { name: 'Business', href: '/business-support' },
    ],
    contact: [
      { name: 'WhatsApp', href: '/contact/whatsapp' },
      { name: 'Support 24', href: '/contact/support-24' },
    ],
  }

  return (
    <motion.footer
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <div className="section-container">
        <motion.div
          variants={fadeIn('up', 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div
            variants={fadeIn('right', 0.4)}
            className="lg:col-span-4"
          >
            <motion.div
              variants={fadeIn('down', 0.5)}
              className="flex items-center gap-1 mb-6"
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full opacity-75"></div>
              <div className="w-4 h-4 bg-red-500 rounded-full -ml-2"></div>
              <span className={`text-xl font-medium ml-1 transition-colors ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                The Next Design
              </span>
            </motion.div>
            <motion.p
              variants={fadeIn('up', 0.6)}
              className={`mb-6 transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times.
            </motion.p>
            <motion.div
              variants={fadeIn('up', 0.7)}
              className="flex gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://github.com/adityadomle/BizFlow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-neutral-900 hover:text-white"
                }`}
              >
                <FaGithub className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <FaFacebookF className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href='https://twitter.com/bizflow'
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300 hover:bg-sky-500 hover:text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-sky-500 hover:text-white"
                }`}
              >
                <FaTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com/company/bizflow"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300 hover:bg-blue-700 hover:text-white" 
                    : "bg-gray-200 text-gray-600 hover:bg-blue-700 hover:text-white"
                }`}
              >
                <FaLinkedinIn className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <motion.div
            variants={fadeIn('left', 0.4)}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div
                  key={category}
                  variants={fadeIn('up', 0.3 * (categoryIndex + 1))}
                >
                  <motion.h3
                    variants={textVariant(0.2)}
                    className="text-lg font-medium mb-4 capitalize"
                  >
                    {category}
                  </motion.h3>
                  <motion.ul
                    variants={fadeIn('up', 0.4)}
                    className="space-y-3"
                  >
                    {links.map((link) => (
                      <motion.li
                        key={`${category}-${link.name}`}
                        variants={fadeIn('up', 0.1)}
                      >
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={link.href}
                          className={`text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 rounded transition-colors ${
                            isDarkMode 
                              ? "hover:text-gray-300" 
                              : "hover:text-gray-900"
                          }`}
                        >
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer;
