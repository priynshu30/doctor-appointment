import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { logout, reset } from '../features/authSlice';

function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    toggleSidebar();
    navigate('/');
  };

  if (!user) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Account</h2>
          <button onClick={toggleSidebar} className="text-2xl text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center border-b bg-blue-50">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl mb-4 border-4 border-white shadow-lg overflow-hidden">
            {user.profileImage ? (
              <img 
                src={user.profileImage.startsWith('http') ? user.profileImage : `https://doctor-appointment-backend-wn5w.onrender.com${user.profileImage}`} 
                alt="profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <FaUser />
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
          <p className="text-blue-600 text-sm font-medium">Patient</p>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <NavLink 
            to="/profile" 
            onClick={toggleSidebar}
            className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <FaUser className="text-lg" />
            <span className="font-medium">My Profile</span>
          </NavLink>
          <NavLink 
            to="/my-appointments" 
            onClick={toggleSidebar}
            className={({ isActive }) => `flex items-center gap-4 p-4 rounded-xl transition-all ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <FaCalendarAlt className="text-lg" />
            <span className="font-medium">My Appointments</span>
          </NavLink>
          
          <div className="mt-8 pt-8 border-t">
            <button 
              onClick={onLogout}
              className="flex items-center gap-4 p-4 rounded-xl w-full text-red-600 hover:bg-red-50 transition-all font-medium"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
