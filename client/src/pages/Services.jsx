import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, reset } from '../features/serviceSlice';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaMicroscope, FaStethoscope, FaDna, FaSyringe, FaPills } from 'react-icons/fa';

const iconMap = {
  "FaHeartbeat": <FaHeartbeat />,
  "FaMicroscope": <FaMicroscope />,
  "FaStethoscope": <FaStethoscope />,
  "FaDna": <FaDna />,
  "FaSyringe": <FaSyringe />,
  "FaPills": <FaPills />
};

function Services() {
  const dispatch = useDispatch();
  const { services, isLoading, isError, message } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getServices());
    return () => dispatch(reset());
  }, [dispatch]);

  // Mock services if DB is empty for initial UI check
  const mockServices = [
    { name: "Cardiology", description: "Comprehensive heart care and diagnostic services for all cardiac conditions.", icon: "FaHeartbeat" },
    { name: "Diagnostic Lab", description: "State-of-the-art laboratory for accurate and fast test results.", icon: "FaMicroscope" },
    { name: "General Checkup", description: "Routine health examinations to maintain your overall well-being.", icon: "FaStethoscope" },
    { name: "Genetics", description: "Advanced genetic testing and counseling for inherited conditions.", icon: "FaDna" },
    { name: "Vaccinations", description: "Protect yourself and your family with our comprehensive immunization programs.", icon: "FaSyringe" },
    { name: "Pharmacy", description: "24/7 pharmacy service with wide range of authentic medicines.", icon: "FaPills" }
  ];

  const displayServices = services.length > 0 ? services : mockServices;

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading services...</div>;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-600">
        {message || 'Unable to load services right now.'}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Our Services</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">We offer a wide range of medical specialties to ensure you receive the best care possible.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayServices.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-none opacity-50 z-0"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-lg transform group-hover:rotate-12 transition-transform">
                {iconMap[service.icon] || <FaStethoscope />}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors uppercase tracking-tight">{service.name}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Services;
