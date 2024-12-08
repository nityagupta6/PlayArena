import { Router } from 'express';
import { createBooking, viewBookings, getAllBookings } from '../controllers/booking.controller.js';

const router = new Router();

router.get('/', viewBookings);
router.get('/all', getAllBookings);
router.post('/', createBooking);

export default router;
