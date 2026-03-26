import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FAQ from '../components/FAQ';
import { FaUserMd, FaCalendarCheck, FaClipboardList, FaArrowRight } from 'react-icons/fa';
const featureCards = [
  {
    icon: <FaUserMd />,
    title: 'Expert Doctors',
    desc: 'Highly qualified specialists with years of experience in their respective fields.',
    accentClass: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
  },
  {
    icon: <FaCalendarCheck />,
    title: 'Easy Booking',
    desc: 'Simple and intuitive appointment scheduling system available 24/7.',
    accentClass: 'bg-green-100 text-green-600 group-hover:bg-green-600',
  },
  {
    icon: <FaClipboardList />,
    title: 'Digital Reports',
    desc: 'Access your medical records and lab reports securely from anywhere.',
    accentClass: 'bg-violet-100 text-violet-600 group-hover:bg-violet-600',
  },
];

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical Banner" 
            className="w-full h-full object-cover scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/40"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Health, Our <br /> <span className="text-blue-300">Top Priority.</span>
            </h1>
            <p className="text-xl mb-10 text-blue-50 leading-relaxed">
              Connect with the best healthcare professionals and book your appointments in seconds. Expert care tailored just for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-appointment" className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-2 shadow-xl">
                Book Appointment <FaArrowRight />
              </Link>
              <Link to="/services" className="bg-blue-600 text-white border-2 border-blue-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl">
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 right-10 hidden lg:flex gap-6 z-10">
          {[
             { label: "Specialists", value: "200+" },
             { label: "Happy Patients", value: "50k+" },
             { label: "Rating", value: "4.9/5" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + (i*0.2) }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white min-w-[140px] text-center"
            >
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-blue-200 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We provide exceptional medical services with a touch of personal care and advanced technology.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featureCards.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-gray-50 border border-gray-100 transition-all hover:shadow-2xl group"
              >
                <div className={`text-4xl mb-6 p-4 rounded-2xl inline-block transition-colors group-hover:text-white ${f.accentClass}`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}

export default Home;
