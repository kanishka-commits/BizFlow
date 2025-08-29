import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/#home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/#services", label: "Our Services" },
    { href: "/#testimonials", label: "Testimonials" },
    { href: "/#faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  const dropdownItems = [
    { href: "/contributors", label: "Contributors", icon: "👥" },
    { href: "/contributor-guide", label: "Contributor Guide", icon: "📖" }
  ];

  const changeTheme = () => {
    toggleTheme()
  };

  const handleHashLinkClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleNavClick = (href) => {
    if (href.includes('#')) {
      // Handle hash links (same page navigation)
      if (location.pathname !== '/') {
        // If not on home page, navigate to home first then scroll
        navigate('/');
        // Small delay to ensure page loads before scrolling
        setTimeout(() => {
          const elementId = href.split('#')[1];
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If on home page, just scroll to section
        const elementId = href.split('#')[1];
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      handleHashLinkClick(href);
    } else {
      // Handle regular page navigation
      setActiveLink(href);
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
      // Navigate using React Router
      navigate(href);
    }
  };

  const handleDropdownItemClick = (href) => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setActiveLink(href);
    // Navigate using React Router
    navigate(href);
  };

  // Update active link based on current location
  useEffect(() => {
    const currentPath = location.pathname + location.hash;
    setActiveLink(currentPath || '/');
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 inset-x-0 z-[9999] border-b backdrop-blur-xl transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-gray-900/20"
            : "bg-white/95 border-gray-100/50 shadow-xl shadow-gray-200/20"
        }`}
      >
        <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 xl:px-9 h-16 lg:h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-lg transform hover:scale-110 hover:rotate-180" />
              <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full -ml-2 opacity-80 group-hover:opacity-100 transition-all duration-300 shadow-lg transform hover:scale-110 hover:-rotate-180" />
            </div>
            <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? "from-white via-blue-100 to-blue-300 group-hover:from-blue-300 group-hover:to-cyan-300" 
                  : "from-gray-800 via-blue-800 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-800"
              }`}>
              <button
                onClick={() => handleNavClick("/#home")}
              >
                BizFlow
              </button>
            </span>
          </div>

          {/* Enhanced Desktop Navigation - Fixed breakpoint from xl to lg */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-12">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm xl:text-base font-semibold relative overflow-hidden group transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg ${
                    isActive 
                      ? "text-blue-600 shadow-lg shadow-blue-200/50" 
                      : isDarkMode 
                        ? "text-gray-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20" 
                        : "text-gray-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
                  }`}
                >
                  <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">
                    {link.label}
                  </span>
                  {/* Enhanced underline effect */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
                      isActive ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  {/* Glowing background on hover */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
                      isDarkMode
                        ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20"
                        : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                    }`}
                  />
                  {/* Subtle border glow */}
                  <div
                    className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                      isDarkMode
                        ? "border-blue-400/30"
                        : "border-blue-500/20"
                    }`}
                  />
                </button>
              );
            })}

            {/* Enhanced Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 text-sm xl:text-base font-semibold relative overflow-hidden group transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg ${
                  isDarkMode 
                    ? "text-gray-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20" 
                    : "text-gray-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
                } ${isDropdownOpen ? "shadow-lg shadow-blue-200/50 text-blue-600" : ""}`}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">Community</span>
                <ChevronDown 
                  className={`w-4 h-4 relative z-10 transition-all duration-500 group-hover:scale-110 ${
                    isDropdownOpen ? "rotate-180 text-blue-600" : "rotate-0"
                  }`}
                />
                {/* Enhanced underline effect */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
                    isDropdownOpen ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                  }`}
                />
                {/* Glowing background on hover */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
                    isDarkMode
                      ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20"
                      : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                  }`}
                />
                {/* Subtle border glow */}
                <div
                  className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                    isDarkMode
                      ? "border-blue-400/30"
                      : "border-blue-500/20"
                  }`}
                />
              </button>

              {/* Dropdown Menu - Fixed z-index */}
              {isDropdownOpen && (
                <div
                  className={`absolute top-full right-0 mt-3 w-56 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden z-[60] transition-all duration-500 transform origin-top-right ${
                    isDarkMode
                      ? "bg-gray-800/98 border-gray-600/40 shadow-gray-900/70"
                      : "bg-white/98 border-gray-200/40 shadow-gray-300/70"
                  } ${
                    isDropdownOpen 
                      ? "opacity-100 scale-100 translate-y-0" 
                      : "opacity-0 scale-95 -translate-y-2"
                  }`}
                >
                  <div className="py-3">
                    {dropdownItems.map((item, index) => (
                      <button
                        key={item.href}
                        onClick={() => handleDropdownItemClick(item.href)}
                        className={`flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all duration-400 group w-full text-left transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden ${
                          isDarkMode
                            ? "text-gray-300 hover:bg-gray-700/60 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20"
                            : "text-gray-700 hover:bg-gray-50/80 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-400 relative z-10">
                          {item.icon}
                        </span>
                        <span className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300">{item.label}</span>
                        {/* Subtle hover effect */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-all duration-400 ${
                            isDarkMode
                              ? "from-blue-500/30 to-cyan-500/30"
                              : "from-blue-500/20 to-cyan-500/20"
                          }`}
                        />
                        {/* Left accent line */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-400 transform scale-y-0 group-hover:scale-y-100`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Desktop CTA + Theme Toggle - Fixed breakpoint */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <button
              onClick={() => {
                const newsletter = document.getElementById("newsletter");
                if (newsletter) {
                  newsletter.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`relative overflow-hidden min-w-[120px] xl:min-w-[150px] px-4 xl:px-7 py-2.5 xl:py-3 rounded-xl font-semibold text-xs xl:text-sm transition-all duration-300 group transform hover:scale-105 hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/60"
              }`}
            >
              <span className="relative z-10 flex items-center gap-1 xl:gap-2">
                💬 Get in Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={changeTheme}
              className={`w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-xl transition-all duration-300 group transform hover:scale-110 hover:rotate-12 ${
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400 shadow-lg shadow-gray-800/50" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 shadow-lg shadow-blue-200/50"
              }`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className={`transition-transform duration-500 ${isDarkMode ? "rotate-0" : "rotate-180"}`}>
                {isDarkMode ? <Sun className="h-4 w-4 xl:h-5 xl:w-5" /> : <Moon className="h-4 w-4 xl:h-5 xl:w-5" />}
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu Button - Fixed z-index */}
          <button
            className={`lg:hidden relative z-[10000] p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-700/50" 
                : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700 border border-gray-200/50"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay - Fixed z-index */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] transition-all duration-500 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Menu Sidebar - Fixed z-index */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-[9995] border-r shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 transform lg:hidden ${
          isDarkMode 
            ? "bg-gray-900/98 border-gray-700/50" 
            : "bg-white/98 border-gray-200/50"
        } ${
          isMenuOpen 
            ? "translate-x-0 opacity-100" 
            : "-translate-x-full opacity-0"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full" />
              <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full -ml-1" />
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode 
                ? "from-white via-blue-100 to-blue-300" 
                : "from-gray-800 via-blue-800 to-blue-600"
            }`}>
              BizFlow
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
              isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-white" 
                : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="p-6 space-y-2 overflow-y-auto h-full pb-32">
          {navLinks.map((link, index) => {
            const isActive = activeLink === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block text-base font-semibold py-4 px-4 rounded-xl transition-all duration-300 w-full text-left transform hover:scale-[1.02] ${
                  isActive 
                    ? isDarkMode
                      ? "bg-blue-900/30 text-blue-400 border border-blue-700/50"
                      : "bg-blue-50 text-blue-600 border border-blue-200" 
                    : isDarkMode 
                      ? "text-gray-300 hover:bg-gray-800/50 hover:text-blue-400" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: `slideInLeft 0.6s ease-out ${index * 100}ms both`
                }}
              >
                {link.label}
              </button>
            );
          })}

          {/* Mobile Community Section */}
          <div
            className={`rounded-xl border transition-all duration-300 mt-6 ${
              isDarkMode 
                ? "border-gray-700/50 bg-gray-800/30" 
                : "border-gray-200/50 bg-gray-50/30"
            }`}
            style={{ 
              animationDelay: `${navLinks.length * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${navLinks.length * 100}ms both`
            }}
          >
            <div className={`px-4 py-3 font-semibold text-sm border-b ${
              isDarkMode 
                ? "text-gray-400 border-gray-700/50" 
                : "text-gray-500 border-gray-200/50"
            }`}>
              Community
            </div>
            {dropdownItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleDropdownItemClick(item.href)}
                className={`flex items-center gap-3 px-4 py-4 text-base font-medium transition-all duration-300 w-full text-left transform hover:scale-[1.02] ${
                  isDarkMode
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } ${index === dropdownItems.length - 1 ? "rounded-b-xl" : ""}`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <div
            className="pt-6"
            style={{ 
              animationDelay: `${(navLinks.length + dropdownItems.length + 1) * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 1) * 100}ms both`
            }}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false);
                const newsletter = document.getElementById("newsletter");
                if (newsletter) {
                  newsletter.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/30"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50"
              }`}
            >
              💬 Get in Touch
            </button>
          </div>

          {/* Theme Toggle in Mobile Menu */}
          <div
            className="pt-4"
            style={{ 
              animationDelay: `${(navLinks.length + dropdownItems.length + 2) * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 2) * 100}ms both`
            }}
          >
            <button
              onClick={changeTheme}
              className={`w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600"
              }`}
            >
              <div className={`transition-transform duration-500 ${isDarkMode ? "rotate-0" : "rotate-180"}`}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </div>
              <span className="font-semibold">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Add CSS for slide animation */}
      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;