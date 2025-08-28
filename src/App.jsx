import { useEffect, useRef, Suspense, lazy } from "react";
import "./App.css";
import { useTheme } from "./context/ThemeContext";
import { useLocation } from "react-router-dom";

// react-toastify
import { ToastContainer } from "react-toastify";

// Essential components (loaded immediately)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loaded components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(()=> import("./pages/About"))
const CompanyLogo = lazy(() => import("./components/CompanyLogo"));
const PurposeSection = lazy(() => import("./components/PurposeSection"));
const FeaturesSection = lazy(() => import("./components/FeaturesSection"));
const ScheduleSection = lazy(() => import("./components/ScheduleSection"));
const MonitorSection = lazy(() => import("./components/MonitorSection"));
const PricingSection = lazy(() => import("./components/PricingSection"));
const ServicesSection = lazy(() => import("./components/ServicesSection"));
const TestimonialsSection = lazy(() => import("./components/TestimonialsSection"));
const NewsletterSection = lazy(() => import("./components/NewsletterSection"));
const NotFound = lazy(() => import("./components/NotFound"));
const Contact = lazy(() => import("./components/Contact"));
const FAQ = lazy(() => import("./components/FAQ"));

// Lazy loaded pages
const Partner = lazy(() => import("./pages/Partner"));
const Contibutors = lazy(() => import("./pages/Contibutors"));
const SupportCareer = lazy(() => import("./pages/SupportCareer"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfUsePage = lazy(() => import("./pages/TermsOfUsePage"));
const ContributorGuide = lazy(() => import("./pages/ContributorGuide"));

// Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Analytics hooks
import useScrollTracking from "./utils/useScrollTracking";
import useTimeTracking from "./utils/useTimeTracking";
import { trackPageView } from "./utils/analytics";

// Simple Loader Component
function Loader() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="flex items-center justify-center min-h-[200px] py-12">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div 
            className={`w-12 h-12 rounded-full border-4 border-solid ${
              isDarkMode 
                ? 'border-gray-700 border-t-indigo-400' 
                : 'border-gray-300 border-t-indigo-600'
            } animate-spin`}
          ></div>
        </div>
        <p className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Loading...
        </p>
      </div>
    </div>
  );
}

// Hash Navigation component
function HashNavigation() {
  const location = useLocation();
  const previousHash = useRef(location.hash);

  useEffect(() => {
    if (location.hash && location.hash !== previousHash.current) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    previousHash.current = location.hash;
  }, [location]);

  return null;
}

function AppContent() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  // Initialize analytics tracking hooks
  useScrollTracking();
  useTimeTracking();

  // Track page views on route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const pageName =
      currentPath === "/"
        ? "Home"
        : currentPath.charAt(1).toUpperCase() + currentPath.slice(2);
    trackPageView(pageName);
  }, [location.pathname]);

  return (
    <main className="relative min-h-screen overflow-x-hidden scroll-smooth transition-colors duration-300">
      {/* Background Gradients */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className={`absolute -top-28 -left-28 w-[500px] h-[500px] rounded-full blur-[80px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-indigo-500/10 to-pink-500/10"
              : "bg-gradient-to-tr from-indigo-500/20 to-pink-500/20"
          }`}
        ></div>
        <div
          className={`absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full blur-[100px] ${
            isDarkMode
              ? "bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
              : "bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
          }`}
        ></div>
      </div>

      <div className="relative z-10 overflow-hidden">
        <Navbar />

        {/* Hash Navigation Handler */}
        <HashNavigation />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section id="home">
                    <Suspense fallback={<Loader />}>
                      <Hero />
                    </Suspense>
                  </section>
                  <section id="about">
                    <Suspense fallback={<Loader />}>
                      <CompanyLogo />
                      <PurposeSection />
                      <FeaturesSection />
                    </Suspense>
                  </section>
                  <section id="services">
                    <Suspense fallback={<Loader />}>
                      <ScheduleSection />
                      <MonitorSection />
                      <PricingSection />
                      <ServicesSection />
                    </Suspense>
                  </section>
                  <section id="testimonials">
                    <Suspense fallback={<Loader />}>
                      <TestimonialsSection />
                    </Suspense>
                  </section>
                  <section id="faq">
                    <Suspense fallback={<Loader />}>
                      <FAQ />
                    </Suspense>
                  </section>
                  <section id="newsletter">
                    <Suspense fallback={<Loader />}>
                      <NewsletterSection />
                    </Suspense>
                  </section>
                </>
              }
            />
            <Route
              path="/partner"
              element={
                <Suspense fallback={<Loader />}>
                  <Partner />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/contributors"
              element={
                <Suspense fallback={<Loader />}>
                  <Contibutors />
                </Suspense>
              }
            />
            <Route
              path="/contributor-guide"
              element={
                <Suspense fallback={<Loader />}>
                  <ContributorGuide />
                </Suspense>
              }
            />
            <Route
              path="/support-career"
              element={
                <Suspense fallback={<Loader />}>
                  <SupportCareer />
                </Suspense>
              }
            />
            <Route
              path="/faqs"
              element={
                <Suspense fallback={<Loader />}>
                  <FAQ />
                </Suspense>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <Suspense fallback={<Loader />}>
                  <PrivacyPolicyPage />
                </Suspense>
              }
            />
            <Route
              path="/terms-of-use"
              element={
                <Suspense fallback={<Loader />}>
                  <TermsOfUsePage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </Suspense>

        {/* Toast container for messages */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable
          theme={isDarkMode ? "dark" : "light"}
          pauseOnHover
        />

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;