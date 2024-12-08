import { useState, useEffect } from "react";
import axios from "axios";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/booking/all`); // Updated endpoint
            setBookings(response.data.data.bookings); // Assuming bookings are in the response
        } catch (error) {
            console.error('Failed to fetch bookings', error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-5">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bookings</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="w-full text-sm text-gray-700">
                    <thead className="bg-[#00B562] text-white">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Court</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Time</th>
                            <th className="p-4 text-left">Center</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No bookings found</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">{booking.user}</td>
                                    <td className="p-4">{booking.court.name}</td> {/* Adjusted for populated court */}
                                    <td className="p-4">{new Date(booking.startTime).toLocaleDateString()}</td> {/* Formatting Date */}
                                    <td className="p-4">{new Date(booking.startTime).toLocaleTimeString()}</td> {/* Formatting Time */}
                                    <td className="p-4">Koramangala</td> {/* Assuming center is populated */}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
