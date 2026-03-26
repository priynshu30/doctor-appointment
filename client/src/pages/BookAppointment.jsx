import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAppointment, reset } from '../features/appointmentSlice';
import { FaCalendarAlt, FaClock, FaStethoscope, FaRegCommentDots, FaCloudUploadAlt, FaChevronRight, FaSync } from 'react-icons/fa';
import axios from 'axios';
import { API_URLS } from '../constants/api';

const doctorTypes = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Gastroenterologist",
  "Gynecologist",
  "Neurologist"
];

function BookAppointment() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctorType: '',
    additionalComments: '',
    reports: '',
  });
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const { date, time, doctorType, additionalComments, reports } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, isLoading, message } = useSelector((state) => state.appointment);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    if (isSuccess) {
      navigate('/my-appointments');
    }
  }, [isSuccess, navigate]);

  useEffect(() => () => dispatch(reset()), [dispatch]);

  const onChange = (e) => {
    if (feedback.text) {
      setFeedback({ type: '', text: '' });
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

      const { data } = await axios.post(API_URLS.upload, formData, config);
      setFormData((prev) => ({ ...prev, reports: data }));
      setFeedback({ type: 'success', text: 'Report uploaded successfully.' });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      setFeedback({ type: 'error', text: 'Error uploading file.' });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!date || !time || !doctorType) {
      setFeedback({ type: 'error', text: 'Please fill at least date, time, and doctor type.' });
      return;
    }
    setFeedback({ type: '', text: '' });
    dispatch(createAppointment(formData));
  };

  const feedbackMessage = feedback.text || (isError ? message || 'Unable to book your appointment right now.' : '');
  const feedbackType = feedback.text ? feedback.type : (isError ? 'error' : '');

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-12 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">

        <div className="md:w-1/3 bg-blue-600 p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-6">Book Your Session</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Take the first step towards better health. Our specialists are ready to help you.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><FaCalendarAlt /></div>
              <span>Pick a Date</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><FaClock /></div>
              <span>Select Time</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><FaStethoscope /></div>
              <span>Choose Specialist</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-12">
          <form onSubmit={onSubmit} className="space-y-8">
            {feedbackMessage && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  feedbackType === 'error'
                    ? 'border border-red-200 bg-red-50 text-red-700'
                    : 'border border-green-200 bg-green-50 text-green-700'
                }`}
              >
                {feedbackMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Appointment Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={onChange}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Preferred Time</label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    value={time}
                    onChange={onChange}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Type of Doctor / Specialist</label>
              <div className="relative">
                <select
                  name="doctorType"
                  value={doctorType}
                  onChange={onChange}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  required
                >
                  <option value="">Select a Specialist</option>
                  {doctorTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Additional Comments</label>
              <textarea
                name="additionalComments"
                value={additionalComments}
                onChange={onChange}
                rows="3"
                placeholder="Describe your symptoms or concerns..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Upload Reports (if any)</label>
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-gray-50 flex flex-col items-center justify-center min-h-[160px]"
              >
                {uploading ? (
                  <FaSync className="text-4xl text-blue-500 animate-spin mb-4" />
                ) : (
                  <FaCloudUploadAlt className="text-4xl text-blue-500 mb-4" />
                )}

                <p className="text-gray-500">
                  {reports ? `File uploaded: ${reports.split('/').pop()}` : 'Drag & drop files here or click to browse'}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={uploadFileHandler}
                  className="hidden"
                  accept="image/*,.pdf"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? 'Booking...' : 'Confirm Appointment'} <FaChevronRight />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default BookAppointment;
