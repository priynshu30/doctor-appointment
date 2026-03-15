import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaTimes, FaStethoscope, FaUserCircle } from 'react-icons/fa';
import { logout, reset } from '../features/authSlice';

function Header({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
          <FaStethoscope className="text-3xl" />
          <span>DocCare</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/services" className="hover:text-blue-600 font-medium transition-colors">Services</Link>
          {user ? (
            <>
              <Link to="/book-appointment" className="hover:text-blue-600 font-medium transition-colors">Book Appointment</Link>
              <Link to="/my-appointments" className="hover:text-blue-600 font-medium transition-colors">My Appointments</Link>
              <button 
                onClick={toggleSidebar}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                <FaBars />
                <span>Menu</span>
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors">Login</Link>
              <Link to="/register" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">Sign Up</Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          <Link to="/services" onClick={() => setIsOpen(false)} className="py-2">Services</Link>
          {user ? (
            <>
              <Link to="/book-appointment" onClick={() => setIsOpen(false)} className="py-2">Book Appointment</Link>
              <Link to="/my-appointments" onClick={() => setIsOpen(false)} className="py-2">My Appointments</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="py-2">My Profile</Link>
              <button onClick={onLogout} className="text-left text-red-600 py-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="py-2">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="py-2">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
