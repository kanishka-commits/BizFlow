import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useTheme } from '../context/ThemeContext'

// Mock motion components for demo
const motion = {
  div: ({ children, className, ...props }) => <div className={className} {...props}>{children}</div>,
  section: ({ children, className, ...props }) => <section className={className} {...props}>{children}</section>,
  h2: ({ children, className, ...props }) => <h2 className={className} {...props}>{children}</h2>,
  p: ({ children, className, ...props }) => <p className={className} {...props}>{children}</p>,
  li: ({ children, className, ...props }) => <li className={className} {...props}>{children}</li>,
  span: ({ children, className, ...props }) => <span className={className} {...props}>{children}</span>
};

// Mock animations
const fadeIn = () => ({});
const textVariant = () => ({});

// Mock toast for demo
const toast = {
  info: (message) => alert(message)
};

// Helper function to calculate price based on product count
const calculatePrice = (basePrice, productCount) =>
  Math.round(basePrice * (productCount / 50));

const PricingCard = ({ name, price, features, animation, isDarkMode }) => (
  <motion.div
    variants={animation}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px", amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col gap-6 items-start will-change-transform
      ${
        isDarkMode
          ? "bg-white/5 backdrop-blur-xl text-white border border-white/10"
          : "bg-white/20 backdrop-blur-xl text-gray-900 border border-white/30"
      }
      shadow-lg ${isDarkMode?" shadow-slate-700" : "dark:shadow-slate-400"}
      transition-all duration-300 ease-out
      hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:scale-[1.02]
      before:absolute before:inset-0 before:rounded-3xl before:p-[1px]
      before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent
      before:mask-composite:exclude before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
  >
    {/* Floating particles effect */}
    <div className="absolute top-4 right-4 opacity-0 transition-all duration-300 ease-out group-hover:opacity-100">
      <SparklesIcon className={`w-6 h-6 ${isDarkMode ? "text-purple-400" : "text-purple-600"} animate-pulse`} />
    </div>

    <div className="relative z-10 w-full">
      {/* Plan name badge */}
      <span
        className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full mb-6 transition-all duration-300 ease-out backdrop-blur-xl
          ${
            isDarkMode
              ? "bg-white/[0.08] border border-white/15 text-blue-200 shadow-lg shadow-black/20"
              : "bg-white/[0.25] border border-white/30 text-blue-700 shadow-md shadow-blue-500/10"
          }
          group-hover:scale-105 group-hover:shadow-lg`}
      >
        {name}
      </span>

      {/* Price display */}
      <div className="mb-8">
        <div className={`flex items-baseline gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          <span className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-600"} bg-clip-text text-transparent`}>
            ${price}
          </span>
          <span className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            /month
          </span>
        </div>
        <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Billed monthly
        </p>
      </div>

      {/* Features list */}
      <div className="mb-8 flex-grow">
        <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          What's included
        </h4>
        <ul className="space-y-3">
          {features.map((feat, index) => (
            <motion.li
              key={feat}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ 
                delay: index * 0.08, 
                duration: 0.4, 
                ease: "easeOut" 
              }}
              className="flex items-start gap-3"
            >
              <CheckCircleIcon
                className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                  isDarkMode ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-500"
                }`}
                aria-hidden="true"
              />
              <span className={`text-sm leading-relaxed transition-colors duration-200 ${
                isDarkMode ? "text-gray-300 group-hover:text-gray-200" : "text-gray-700 group-hover:text-gray-600"
              }`}>
                {feat}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <button
        className={`w-full py-3 px-6 rounded-xl font-semibold relative overflow-hidden transition-all duration-300 ease-out backdrop-blur-xl
          ${
            isDarkMode
              ? "bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/15 shadow-lg shadow-black/20"
              : "bg-white/[0.20] hover:bg-white/[0.30] text-gray-800 border border-white/25 shadow-md shadow-blue-500/10"
          }
          hover:scale-[1.02] hover:shadow-xl active:scale-98 transform
          before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
          ${isDarkMode 
            ? "before:from-blue-500/[0.08] before:to-cyan-500/[0.08]" 
            : "before:from-blue-500/[0.10] before:to-cyan-500/[0.10]"
          } before:opacity-0 before:transition-all before:duration-300
          hover:before:opacity-100 cursor-pointer`}
        onClick={() =>
          toast.info("⚒️ This feature is coming soon! Stay tuned for updates.")
        }
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Choose Plan
          <motion.span
            initial={{ x: 0 }}
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </span>
      </button>
    </div>
  </motion.div>
);

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  animation: PropTypes.object.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

const PricingSection = () => {
  const { isDarkMode } = useTheme();
  const [productCount] = useState(1);
  const starterPrice = calculatePrice(4000, productCount);
  const businessPrice = calculatePrice(7500, productCount);

  const plans = [
    {
      name: "Starter",
      price: starterPrice,
      features: [
        "Up to 10 users",
        "Email support",
        "Basic analytics dashboard",
        "Access to community forum",
        "Standard security features",
        "Weekly performance reports",
      ],
      animation: fadeIn("right", 0.5),
    },
    {
      name: "Business",
      price: businessPrice,
      features: [
        "Unlimited users",
        "Priority email & chat support",
        "Advanced analytics & custom reports",
        "Team collaboration tools",
        "Multiple project workspaces",
        "Daily performance insights",
      ],
      animation: fadeIn("left", 0.5),
    },
  ];

  return (
    <div className="min-h-screen">
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`relative py-20 px-4 overflow-hidden transition-colors duration-300 bg-transparent`}
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.h2
              variants={textVariant(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r ${
                isDarkMode 
                  ? "from-blue-400 via-cyan-300 to-blue-500" 
                  : "from-blue-600 via-cyan-600 to-blue-700"
              } bg-clip-text text-transparent leading-normal`}
            >
              Pricing Plans
            </motion.h2>
            <motion.p
              variants={textVariant(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className={`text-lg md:text-xl max-w-2xl mx-auto ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
            </motion.p>
          </div>

          {/* Pricing cards */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px", amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
            className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} isDarkMode={isDarkMode} />
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mt-16"
          >
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingSection;