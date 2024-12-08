import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Navbar({
    centersData,
    updateCalendar,
    setDate,
    triggerUpdate
}) {
    const dummyCenters = [
        { id: '1', name: 'Indiranagar', sports: ['Badminton', 'Squash'] }
    ];
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const [centers, setCenters] = useState([]);
    const [selectedCenter, setSelectedCenter] = useState(dummyCenters[0]);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    useEffect(() => {
        if (selectedCenter.sports.length > 0) {
            setSelectedSport(selectedCenter?.sports[0]);
        }
    }, [selectedCenter]);

    const handleCenterChange = (event) => {
        const center = centers?.find(c => c._id === event.target.value);
        setSelectedCenter(center);
    };

    const handleSportChange = (event) => {
        setSelectedSport(event.target.value);
    };
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    useEffect(() => {
        if (centersData.length != 0) {
            console.log(centersData);
            setCenters(centersData);
            setSelectedCenter(centersData[0]);
        }
    }, [centersData])
    const fetchBookings = async () => {
        if (selectedCenter && selectedSport && selectedDate) {
            const dateObj = new Date(selectedDate);
            const isoDate = dateObj.toISOString().split('T')[0];
            console.log(dateObj);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/booking`, {
                    params: {
                        center: selectedCenter,
                        sport: selectedSport,
                        date: isoDate
                    }
                });
                console.log(response);
                updateCalendar(response.data.data.bookings, response.data.data.courts);
                // setBookings(response.data.bookings);
            } catch (error) {
                console.error('Failed to fetch bookings', error);
            }
        }
    };
    const handleSubmit = () => {

        fetchBookings();
        const dateObj = new Date(selectedDate);
        setDate(dateObj);
    }
    useEffect(() => {
        if (selectedCenter && selectedSport && selectedDate) {
            handleSubmit();
        }
    }, [selectedDate, selectedCenter, selectedSport])
    useEffect(() => {
        if (selectedCenter && selectedSport && selectedDate) {
            handleSubmit();
        }
    }, [triggerUpdate])
    return (
        <div className="fixed bottom-10 shadow-lg border-gray-400  border-b-2">
            <div className='flex px-5 py-2 gap-2 items-center'>
                <div className='flex gap-2'>
                    <label className='font-bold' htmlFor="center-select">Center : </label>
                    <select className='text-center outline-none' id="center-select" value={selectedCenter._id} onChange={handleCenterChange}>
                        {centers.map((center) => (
                            <option key={center._id} value={center._id}>{center.name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex gap-2'>
                    <label className='font-bold' htmlFor="sport-select">Sport :</label>
                    <select className='text-center outline-none' id="sport-select" value={selectedSport} onChange={handleSportChange} disabled={selectedCenter.sports.length === 0}>
                        {selectedCenter.sports.map((sport) => (
                            <option key={sport._id} value={sport._id}>{sport.name}</option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-2' >
                    <label className='font-bold' htmlFor="date-picker">Date :</label>
                    <input className='text-center' type="date" id="date-picker" value={selectedDate} onChange={handleDateChange} />
                </div>
                {/* <div className='flex gap-2' >
                    <button onClick = {handleSubmit} className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded'>Search</button>
                </div> */}
            </div>
        </div>
    )
}