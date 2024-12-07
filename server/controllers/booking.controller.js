import Booking from "../models/booking.model.js";
import Court from "../models/court.model.js";
import Sport from "../models/sport.model.js";
import Center from "../models/center.model.js";
import {
  response_200,
  response_201,
  response_400,
  response_401,
  response_500,
} from "../utils/responseCodes.js";
export async function viewBookings(req, res) {
  const { date, sport, center } = req.query;
  try {
    if (!Date.parse(date)) {
      return response_400(res, "Invalid date format. Please use ISO 8601 format (YYYY-MM-DD).");
    }
    const foundSport = await Sport.findById(sport);
    if (!foundSport) {
      return response_400(res, "Sport not found");
    }
    const foundCenter = await Center.findById(center);
    if (!foundCenter) {
      return response_400(res, "Center not found");
    }
    const courts = await Court.find({
      sportId: sport,
      centerId: center,
    })
    const courtIds = courts.map((court) => court._id);
    const startDate = new Date(date);
    // startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    const bookings = await Booking.find({
      startTime: {
        $gte: startDate,
        $lt: endDate,
      },
      court: { $in: courtIds },
    });
    const responseData = {
      bookings: bookings,
      courts: courts,
    };
    return response_200(res, "Bookings fetched successfully", responseData);
  } catch (err) {
    return response_500(res, "Server Error", err);
  }
}
export async function createBooking(req, res) {
  const { courtId, startTime,name } = req.body; 
  const duration = 60; 

  try {
    const court = await Court.findById(courtId);
    if (!court) {
      return response_400(res, "Court not found");
    }
    const bookingStart = new Date(startTime);
    if (isNaN(bookingStart.getTime())) {
      return response_400(res, "Invalid start time format");
    }

    const bookingEnd = new Date(bookingStart);
    bookingEnd.setMinutes(bookingStart.getMinutes() + duration);

    console.log(startTime);
    console.log(bookingStart);
    console.log(bookingEnd);

    const conflictingBooking = await Booking.findOne({
      court: courtId,
      $or: [
        { startTime: { $lt: bookingEnd, $gte: bookingStart } },
        { endTime: { $gt: bookingStart, $lte: bookingEnd } }
    ]
    });

    if (conflictingBooking) {
      return response_400(res, "Time slot is already booked.");
    }

    const newBooking = new Booking({
      user: name,
      court: courtId,
      startTime: bookingStart,
      endTime: bookingEnd,
    });

    console.log(newBooking);
    await newBooking.save();
    return response_200(res, "Booking created successfully", newBooking);
  } catch (error) {
    return response_500(res, "Failed to create booking", error);
  }
}
