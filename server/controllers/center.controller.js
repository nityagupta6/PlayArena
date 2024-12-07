import Center from '../models/center.model.js';

export async function createCenter(req, res) {
  const { name, sports } = req.body;

  try {
    const newCenter = new Center({
      name,
      sports
    });

    await newCenter.save();
    res.status(201).json({ message: 'Center created successfully', data: newCenter });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create center', error: err.message });
  }
}

export async function getAllCenters(req, res) {
    try {
      const centers = await Center.find().populate('sports');
      res.status(200).json({ message: 'Centers fetched successfully', data: centers });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch centers', error: err.message });
    }
  }