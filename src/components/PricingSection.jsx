import { useState } from "react";
import PropTypes from "prop-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

// Helper function to calculate price based on product count
const calculatePrice = (basePrice, productCount) =>
  Math.round(basePrice * (productCount / 50));

const PricingCard = ({ name, price, features, isDarkMode }) => (
  <div
    className={`shadow-lg hover:shadow-xl rounded-2xl px-5 justify-center py-5 transition-all duration-300 flex flex-col gap-3 items-start hover:translate-y-[-2px]
      ${
        isDarkMode
          ? "bg-gradient-to-bl from-gray-800 via-gray-900 to-gray-950 text-white"
          : "bg-white text-gray-900"
      }`}
  >
    <span
      className={`text-md px-3 py-1 rounded-full mb-4 border ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-purple-200"
          : "bg-purple-50 border-purple-300 text-purple-800"
      }`}
    >
      {name}
    </span>
    <p
      className={`text-2xl font-semibold mb-6 ${
        isDarkMode ? "text-indigo-200" : "text-indigo-700"
      }`}
    >
      <span>Price: </span>${price}/month
    </p>
    <ul
      className={`list-none pl-0 mb-6 ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {features.map((feat) => (
        <li key={feat} className="flex items-start mb-2">
          <CheckCircleIcon
            className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
              isDarkMode ? "text-purple-400" : "text-purple-600"
            }`}
            aria-hidden="true"
          />
          <span>{feat}</span>
        </li>
      ))}
    </ul>
    <button
      className={`px-6 py-3 rounded-full transition-all duration-300 font-medium hover:scale-105 ${
        isDarkMode
          ? "bg-purple-900 text-gray-200 hover:bg-purple-800"
          : "bg-purple-600 text-white hover:bg-purple-500"
      }`}
      onClick={() =>
        toast.info("⚒️ This feature is coming soon! Stay tuned for updates.")
      }
    >
      Choose Plan
    </button>
  </div>
);

PricingCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    },
  ];

  return (
    <section
      className={`py-16 px-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-pink-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="rounded-lg py-5 text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 text-center mb-16">
          Pricing
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;