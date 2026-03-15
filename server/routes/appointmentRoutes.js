const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createAppointment).get(protect, getUserAppointments);

module.exports = router;
