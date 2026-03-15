import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/authSlice';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
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
    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }
    dispatch(login(formData));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
      >
        <div className="text-center mb-10 text-blue-600">
           <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <FaKey className="text-3xl" />
           </div>
          <h2 className="text-4xl font-extrabold mb-2">Welcome Back</h2>
          <p className="text-gray-500">Log in to manage your health sessions</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
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

          <div className="flex justify-end pr-2">
            <a href="#" className="text-sm text-blue-600 font-semibold hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center border-t pt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Join Now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
