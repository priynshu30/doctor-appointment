import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments, reset } from '../features/appointmentSlice';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaClock, FaStethoscope, FaFilter, FaFileAlt } from 'react-icons/fa';
import { resolveApiAssetUrl } from '../constants/api';

function MyAppointments() {
  const dispatch = useDispatch();
  const { appointments, isLoading, isError, message } = useSelector((state) => state.appointment);
  const [filterYear, setFilterYear] = useState('All');

  useEffect(() => {
    dispatch(getAppointments());
    return () => dispatch(reset());
  }, [dispatch]);

  const years = ['All', ...new Set(appointments.map(app => new Date(app.date).getFullYear().toString()))].sort();

  const filteredAppointments = filterYear === 'All' 
    ? appointments 
    : appointments.filter(app => new Date(app.date).getFullYear().toString() === filterYear);

  if (isLoading) return <div className="p-20 text-center">Loading your health sessions...</div>;
  if (isError) return <div className="p-20 text-center text-red-600">{message || 'Unable to load your appointments right now.'}</div>;

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Appointments</h1>
          <p className="text-gray-500">History of your medical consultations</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
           <div className="pl-4 text-blue-600"><FaFilter /></div>
           <select 
             className="pr-8 py-2 bg-transparent outline-none font-bold text-gray-700"
             value={filterYear}
             onChange={(e) => setFilterYear(e.target.value)}
           >
             {years.map(y => <option key={y} value={y}>{y}</option>)}
           </select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            <FaCalendarCheck />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Appointments Found</h2>
          <p className="text-gray-500">You haven't scheduled any appointments for this period.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAppointments.map((app, index) => (
            <motion.div 
              key={app._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                    <FaStethoscope />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{app.doctorType}</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">Confirmed</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaCalendarCheck className="text-blue-500" />
                    <span className="font-medium">{new Date(app.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaClock className="text-blue-500" />
                    <span className="font-medium">{app.time}</span>
                  </div>
                </div>

                {app.reports && (
                  <div className="mb-6">
                    <a 
                      href={resolveApiAssetUrl(app.reports)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                      <FaFileAlt /> View Document
                    </a>
                  </div>
                )}

                {app.additionalComments && (
                  <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-2">
                      <FaFileAlt /> Notes
                    </div>
                    <p className="text-sm text-gray-600 italic line-clamp-2">"{app.additionalComments}"</p>
                  </div>
                )}

                <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-colors">
                   View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAppointments;
