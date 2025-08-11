import React from 'react';
import slack from '../assets/slack.png';
import amazon from '../assets/amazon.png';
import woocommerce from '../assets/woocommerce.png';
import meundies from '../assets/meundies.png';
import sitepoint from '../assets/sitepoint.png';

const CompanyLogo = () => {
  const logos = [slack, amazon, woocommerce, meundies, sitepoint];

  return (
    <div className="w-full container mx-auto py-20 overflow-hidden flex flex-col sm:flex-row sm:items-center items-start">
      <div className="w-[300px] shrink-0 px-8 text-gray-600 border-l-4 border-blue-500 bg-white py-2 z-10 sm:text-base text-xl font-semibold sm:text-left mb-8 sm:mb-0">
        Proud partner at <br /> Hubspot & Segment
      </div>

      {/* Scrolling logos */}
      <div className="flex animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Company Logo ${index + 1}`}
            className="company-logo-img mx-12 h-8 w-36 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyLogo;
