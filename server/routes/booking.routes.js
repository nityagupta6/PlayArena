import {Router} from 'express';
import { createBooking,viewBookings } from '../controllers/booking.controller.js';
const router=new Router();
router.get('/',viewBookings);
router.post('/',createBooking);
export default router;