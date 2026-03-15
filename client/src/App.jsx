import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import Services from './pages/Services';

// No placeholders needed anymore
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
            
            {/* Private Routes */}
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/book-appointment" element={user ? <BookAppointment /> : <Navigate to="/login" />} />
            <Route path="/my-appointments" element={user ? <MyAppointments /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
