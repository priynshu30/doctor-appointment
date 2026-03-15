const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const services = [
  { 
    name: "Cardiology", 
    description: "Comprehensive heart care and diagnostic services for all cardiac conditions.", 
    imageUrl: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    name: "Diagnostic Lab", 
    description: "State-of-the-art laboratory for accurate and fast test results.", 
    imageUrl: "https://images.unsplash.com/photo-1579152276506-2cf746d03f0b?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    name: "General Checkup", 
    description: "Routine health examinations to maintain your overall well-being.", 
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    name: "Genetics", 
    description: "Advanced genetic testing and counseling for inherited conditions.", 
    imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    name: "Vaccinations", 
    description: "Protect yourself and your family with our comprehensive immunization programs.", 
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=400" 
  },
  { 
    name: "Pharmacy", 
    description: "24/7 pharmacy service with wide range of authentic medicines.", 
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=400" 
  }
];

const importData = async () => {
  try {
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
