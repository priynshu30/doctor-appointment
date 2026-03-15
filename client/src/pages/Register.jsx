import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/authSlice';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const { name, email, password, contactNumber } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }

    if (isSuccess || user) {
      navigate('/profile');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !contactNumber) {
      alert('Please fill all fields');
      return;
    }
    dispatch(register(formData));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-2">Create Account</h2>
          <p className="text-gray-500">Join DocCare to book your appointments</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={onChange}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={onChange}
              required
            />
          </div>

          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              value={contactNumber}
              placeholder="Contact Number"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={onChange}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              onChange={onChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'Processing...' : 'Register'} <span className="text-xl">🚀</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
