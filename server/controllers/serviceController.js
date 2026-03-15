const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a service (Admin only basically - but we will leave it open or mocked for this project)
// @route   POST /api/services
// @access  Public
const createService = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  try {
    const service = new Service({
      name,
      description,
      imageUrl,
    });
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getServices, createService };
