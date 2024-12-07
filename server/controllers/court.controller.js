import Court from '../models/court.model.js';

export async function createCourt(req, res) {
  const { name, centerId, sportId } = req.body;

  try {
    const newCourt = new Court({
      name,
      centerId,
      sportId
    });

    await newCourt.save();
    res.status(201).json({ message: 'Court created successfully', data: newCourt });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create court', error: err.message });
  }
}

export async function getAllCourts(req, res) {
    try {
      const courts = await Court.find().populate('centerId sportId');
      res.status(200).json({ message: 'Courts fetched successfully', data: courts });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch courts', error: err.message });
    }
  }