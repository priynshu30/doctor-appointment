import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaPhone, FaEnvelope, FaCamera, FaEdit, FaSync } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { updateProfile } from '../features/authSlice';
import axios from 'axios';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    contactNumber: user?.contactNumber || '',
  });

  const { name, contactNumber } = formData;
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      dispatch(updateProfile({ profileImage: data }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      alert('Error uploading image');
    }
  };

  const onCameraClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="bg-blue-600 h-48 relative">
          <div className="absolute -bottom-16 left-10">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-full p-1 shadow-2xl">
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500 overflow-hidden">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser />
                  )}
                </div>
              </div>
              <button 
                onClick={onCameraClick}
                disabled={uploading}
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg disabled:bg-blue-300 z-10"
              >
                {uploading ? <FaSync className="animate-spin" /> : <FaCamera />}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={uploadFileHandler}
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <div className="pt-20 px-10 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="text-3xl font-bold text-gray-800 border-b-2 border-blue-500 outline-none bg-gray-50 px-2 py-1 rounded-t-lg"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
              )}
              <p className="text-blue-600 font-medium">Verified Patient Account</p>
            </div>
            <button 
              onClick={isEditing ? onSave : () => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-bold shadow-lg"
            >
              {isEditing ? <><FaSync /> Save Profile</> : <><FaEdit /> Edit Profile</>}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</p>
                  <p className="text-gray-700 font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">
                  <FaPhone />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Contact Number</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="contactNumber"
                      value={contactNumber}
                      onChange={onChange}
                      className="text-gray-700 font-semibold border-b border-blue-500 outline-none w-full bg-transparent"
                    />
                  ) : (
                    <p className="text-gray-700 font-semibold">{user?.contactNumber}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Account Stats</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Member Since</span>
                <span className="font-bold text-gray-800">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Health Score</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">Good</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
