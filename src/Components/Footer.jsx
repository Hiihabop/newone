import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-6 mt-5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="">
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">DriedFruitCo</h1>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Terms</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/Privacy_Policy" className="hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/Exchange_Policy" className="hover:text-yellow-400">Cancellation Policy</Link></li>
              <li><Link to="/Terms_of_service" className="hover:text-yellow-400">Terms and Conditions</Link></li>
              <li><Link to="/Shipping_policy" className="hover:text-yellow-400">Delivery and Returns</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DriedFruitCo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
