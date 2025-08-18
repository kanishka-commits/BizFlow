import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX, HiSun, HiMoon } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { trackButtonClick } from "../utils/analytics";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/#home");
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const userScroll = useRef(false); // Ref to track user click-scrolls

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#about", label: "About Us" },
    { href: "/#services", label: "Our Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/analytics", label: "Analytics" },
    { href: "/contact", label: "Contact" },
    { href: "/contributors", label: "Contributors" },
  ];

  // Handles active link for PAGE changes
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/") {
      setActiveLink("/#home");
    } else {
      const activeNav = navLinks.find(link => link.href === currentPath);
      if (activeNav) {
        setActiveLink(activeNav.href);
      }
    }
  }, [location.pathname]);

  // Handles scroll spy ONLY on the homepage
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;
    const options = { rootMargin: "-40% 0px -60% 0px", threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      if (userScroll.current) return; // Ignore observer if a click-scroll is happening
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          setActiveLink(`/#${id}`);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  // Click handler to prevent scroll-spy flickering
  const handleHashLinkClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
    userScroll.current = true;
    setTimeout(() => {
      userScroll.current = false;
    }, 1000); // Ignore scroll spy for 1 second
  };
  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`fixed top-0 inset-x-0 z-50 border-b shadow-sm transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900/90 backdrop-blur-sm border-gray-700"
          : "bg-white/90 backdrop-blur-sm border-gray-100"
      }`}
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 lg:h-20 h-16">
        {/* Logo */}
        <motion.div
          variants={fadeIn("right", 0.3)}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-1">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-4 h-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"
            ></motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-4 h-4 bg-red-500 rounded-full -ml-2 hover:opacity-75 transition-opacity"
            ></motion.div>
          </div>
          <motion.span
            whileHover={{ scale: 1.02 }}
            className={`text-4xl font-bold transition-colors ${
              isDarkMode
                ? "text-white hover:text-blue-400"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            BizFlow
          </motion.span>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          className={`lg:hidden p-2 cursor-pointer transition-colors ${
            isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </motion.button>

        {/* Navigation Links - Desktop */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          className="hidden lg:flex items-center lg:gap-6 xl:gap-10"
        >
          {navLinks.map((link) => {
            const isActive = activeLink === link.href;
            if (link.href === "/#home") {
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    handleHashLinkClick(link.href);
                    if (location.pathname !== "/") {
                      navigate("/#home");
                    } else {
                      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all cursor-pointer transition-colors ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            }

            return link.href.includes("/#") ? (
              <HashLink
                key={link.href}
                smooth
                to={link.href}
                onClick={() => handleHashLinkClick(link.href)}
                className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all transition-colors ${
                  isActive
                    ? "text-blue-600 after:w-full"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </HashLink>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all transition-colors ${
                  location.pathname === link.href
                    ? "text-blue-600 after:w-full"
                    : isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.div>

        {/* CTA Button and Theme Toggle */}
        <motion.div
          variants={fadeIn("left", 0.3)}
          className="hidden lg:flex items-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              trackButtonClick("Navbar CTA Button");
              if (location.pathname !== "/") {
                navigate("/#newsletter");
              } else {
                document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-100 cursor-pointer"
          >
            Get in touch
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg transition-all cursor-pointer ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300"
                : "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700"
            }`}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className={`lg:hidden border-t py-4 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-100"
          }`}
        >
          <motion.div
            variants={fadeIn("down", 0.3)}
            className="container mx-auto px-4 space-y-6"
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              if (link.href === "/#home") {
                return (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleHashLinkClick(link.href);
                      if (location.pathname !== "/") {
                        navigate("/#home");
                      } else {
                        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`block text-base font-medium py-2 cursor-pointer w-full text-left transition-colors ${
                      isActive
                        ? "text-blue-600"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }

              return link.href.includes("/#") ? (
                <HashLink
                  key={link.href}
                  smooth
                  to={link.href}
                  onClick={() => handleHashLinkClick(link.href)}
                  className={`block text-base font-medium py-2 cursor-pointer transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block text-base font-medium py-2 cursor-pointer transition-colors ${
                    location.pathname === link.href
                      ? "text-blue-600"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <motion.button
              variants={fadeIn("up", 0.4)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                trackButtonClick("Mobile Navbar CTA Button");
                setIsMenuOpen(false);
                if (location.pathname !== "/") {
                  navigate("/#newsletter");
                } else {
                  document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-base font-medium transition-all hover:shadow-lg hover:shadow-blue-100 cursor-pointer"
            >
              Get in touch
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;