import CalendarItem from "../misc/calendarItem";
import CourtColumn from "./courtColumn";
import TimeColumn from "./timeColumn";
export default function Calendar({ bookings, courts,selectedDate,trigger }){
    return (
        <div className=" h-[60%] max-w-[90%] flex border-[.5px] shadow-lg rounded overflow-scroll">
            <div className="sticky left-0 z-10">
                <TimeColumn/>
            </div>
            {courts.length!==0?courts.map((court) => (
                <CourtColumn trigger = {trigger} selectedDate = {selectedDate} key={court._id} id = {court._id} courtNumber={court.name} bookings={bookings.filter(b => b.court === court._id)} />
            )):
                <div className="flex justify-center items-center p-10 bg-gray-200 sticky top-0">
                    No Courts Available
                </div>
            }
        </div>
    )
}