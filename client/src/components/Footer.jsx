import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaStethoscope } from 'react-icons/fa';

const apiDocsUrl = 'https://doctor-appointment-backend-wn5w.onrender.com/api-docs';

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
            <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-blue-500 transition-colors">Services</Link></li>
            <li><Link to="/book-appointment" className="hover:text-blue-500 transition-colors">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Support</h4>
          <ul className="space-y-4">
            <li><Link to="/services" className="hover:text-blue-500 transition-colors">Help Center</Link></li>
            <li><Link to="/profile" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
            <li><Link to="/register" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
            <li>
              <a
                href={apiDocsUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                API Documentation
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaLinkedin /></a>
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
