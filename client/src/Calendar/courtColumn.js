import CalendarItem from "../misc/calendarItem"
import { useEffect, useState } from "react";
export default function CourtColumn({ id, courtNumber, bookings, selectedDate, trigger }) {
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        const slotsTemp = Array.from({ length: 24 }, (_, i) => {
            const startTime = `${i < 10 ? `0${i}` : i}:00`;
            const endTime = `${i + 1 < 10 ? `0${i + 1}` : i + 1}:00`;
            let bookedBy = null;

            const isBooked = bookings.some(b => {
                const startHour = new Date(b.startTime).getUTCHours();
                const endHour = new Date(b.endTime).getUTCHours();

                if ((i >= startHour && (i < endHour || endHour == 0))) {
                    bookedBy = b.user;
                    return true;
                }
                return false;
            });

            return { startTime, endTime, isBooked, bookedBy };
        });
        setSlots(slotsTemp);

    }, [bookings])
    return (
        <div >
            <CalendarItem key={0} type="courtHeader" data={courtNumber} />
            {slots.map((slot, index) => (
                <CalendarItem trigger={trigger} courtID={id} selectedDate={selectedDate} key={index + 1} data={slot} idx={index} status={slot.isBooked ? "booked" : "available"} />
            ))}
        </div>
    )
}