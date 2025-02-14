const magazineService = require('../services/magazine.service');

exports.createMagazine = async (req, res) => {
  try {
    const magazine = await magazineService.createMagazine(req.body);
    res.status(201).json(magazine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMagazinesWithPlans = async (req, res) => {
  try {
    const magazines = await magazineService.getMagazinesWithPlans();
    res.status(200).json(magazines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
