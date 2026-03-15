const Appointment = require('../models/Appointment');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  const { date, time, doctorType, additionalComments, reports } = req.body;

  try {
    const appointment = new Appointment({
      user: req.user._id,
      date,
      time,
      doctorType,
      additionalComments,
      reports,
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id }).sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAppointment, getUserAppointments };
