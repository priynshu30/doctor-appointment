const isDev = import.meta.env.DEV;
export const API_BASE = isDev
  ? 'http://localhost:5000' 
  : 'https://doctor-appointment-backend-wn5w.onrender.com';

console.log('API_BASE is set to:', API_BASE);

export const API_URLS = {
  auth: `${API_BASE}/api/auth`,
  appointments: `${API_BASE}/api/appointments`,
  services: `${API_BASE}/api/services`,
  upload: `${API_BASE}/api/upload`,
};
