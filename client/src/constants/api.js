export const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000' 
  : 'https://doctor-appointment-backend-wn5w.onrender.com';

export const API_URLS = {
  auth: `${API_BASE}/api/auth`,
  appointments: `${API_BASE}/api/appointments`,
  services: `${API_BASE}/api/services`,
  upload: `${API_BASE}/api/upload`,
};
