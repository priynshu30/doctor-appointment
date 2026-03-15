const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const path = require('path');
const fs = require('fs');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`Running in ${NODE_ENV} mode`);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(process.cwd(), '/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/upload', require('./routes/uploadRoutes'));

app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
