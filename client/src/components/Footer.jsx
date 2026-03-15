import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaStethoscope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
            <FaStethoscope className="text-blue-500" />
            <span>DocCare</span>
          </div>
          <p className="text-sm">
            Providing world-class healthcare at your fingertips. Book appointments with top specialists easily.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-4">
            <li><a href="/" className="hover:text-blue-500 transition-colors">Home</a></li>
            <li><a href="/services" className="hover:text-blue-500 transition-colors">Services</a></li>
            <li><a href="/doctors" className="hover:text-blue-500 transition-colors">Our Doctors</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-500"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 border-t border-gray-800 mt-12 pt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} DocCare Hospital. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
