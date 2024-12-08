import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "../Calendar";
import Navbar from "../Navbar";
import axios from "axios";

export default function CustomerHome() {
    const [centers, setCenters] = useState([]);
    const [bookingsData, setBookings] = useState([]);
    const [courtsData, setCourts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [triggerUpdate, setTrigger] = useState(false);

    const fetchCenters = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/center`);
            setCenters(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateCalendar = (bookings, courts) => {
        setBookings(bookings);
        setCourts(courts);
    };

    useEffect(() => {
        fetchCenters();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <Navbar triggerUpdate={triggerUpdate} centersData={centers} updateCalendar={updateCalendar} setDate={setSelectedDate} />
            <Calendar trigger={setTrigger} bookings={bookingsData} courts={courtsData} selectedDate={selectedDate} />
            {/* View Bookings Button */}
            <Link to="/bookings">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">View Bookings</button>
            </Link>
        </div>
    );
}
