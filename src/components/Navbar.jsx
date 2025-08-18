import React, { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { trackButtonClick } from "../utils/analytics";
import { HashLink } from "react-router-hash-link";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/#home");
  const location = useLocation();
  const navigate = useNavigate();
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
      // If a click-scroll is in progress, ignore observer events to prevent flickering
      if (userScroll.current) return;

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

  const handleHashLinkClick = (href) => {
    // Immediately set the link as active
    setActiveLink(href);
    // Set a flag to indicate a user-initiated scroll
    userScroll.current = true;
    // Close mobile menu if open
    setIsMenuOpen(false);

    // After 1 second (enough time for scroll to finish), reset the flag
    setTimeout(() => {
      userScroll.current = false;
    }, 1000);
  };
  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 inset-x-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm"
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
            className="text-4xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            BizFlow
          </motion.span>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
          className="lg:hidden p-2 cursor-pointer"
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
          {navLinks.map((link, index) => {
            const isActive = activeLink === link.href;
            if (link.href === "/#home") {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleHashLinkClick(link.href);
                    if (location.pathname !== "/") {
                      navigate("/#home");
                    } else {
                      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all cursor-pointer ${
                    isActive ? "text-blue-600 after:w-full" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </button>
              );
            }

            return link.href.includes("/#") ? (
              <HashLink
                key={index}
                smooth
                to={link.href}
                onClick={() => handleHashLinkClick(link.href)}
                className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                  isActive ? "text-blue-600 after:w-full" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </HashLink>
            ) : (
              <Link
                key={index}
                to={link.href}
                onClick={() => setActiveLink(link.href)}
                className={`text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                  location.pathname === link.href ? "text-blue-600 after:w-full" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={fadeIn("left", 0.3)}
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
          className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100 cursor-pointer"
        >
          Get in touch
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          animate="show"
          className="lg:hidden bg-white border-t border-gray-100 py-4"
        >
          <div
            variants={fadeIn("down", 0.3)}
            className="container mx-auto px-4 space-y-6"
          >
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.href;
              if (link.href === "/#home") {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleHashLinkClick(link.href);
                      if (location.pathname !== "/") {
                        navigate("/#home");
                      } else {
                        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`block text-base font-medium py-2 cursor-pointer w-full text-left ${
                      isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              }

              return link.href.includes("/#") ? (
                <HashLink
                  key={index}
                  smooth
                  to={link.href}
                  onClick={() => handleHashLinkClick(link.href)}
                  className={`block text-base font-medium py-2 cursor-pointer ${
                    isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </HashLink>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  onClick={() => {
                    setActiveLink(link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block text-base font-medium py-2 cursor-pointer ${
                    location.pathname === link.href ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
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
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;