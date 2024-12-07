import Sport from '../models/sport.model.js';

export async function createSport(req, res) {
  const { name } = req.body;

  try {
    const newSport = new Sport({
      name
    });

    await newSport.save();
    res.status(201).json({ message: 'Sport created successfully', data: newSport });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create sport', error: err.message });
  }
}

export async function getAllSports(req, res) {
    try {
      const sports = await Sport.find();
      res.status(200).json({ message: 'Sports fetched successfully', data: sports });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch sports', error: err.message });
    }
  }