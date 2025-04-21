import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground  py-10  border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold">Maggies Thrift Shop</h2>
          <p className="mt-2 text-sm">
            Elevate your style with premium picks and unbeatable prices.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold  dark:text-white mb-2">Contact</h3>
          <ul className="text-sm space-y-1">
            <li>Email: kivulumargret@gmail.com</li>
            <li>Phone: +254 768527247</li>
            <li>Location: Mombasa, Kenya</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} Maggies Thrift Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
