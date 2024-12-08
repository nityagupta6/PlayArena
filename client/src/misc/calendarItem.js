import { useEffect, useState } from "react";
import AddBooking from "./addBooking";
export default function CalendarItem(props){
    const [showAddBooking,setShowAddBooking] = useState(false);
    const handleAdd = ()=>{
        setShowAddBooking(!showAddBooking);
    }
    return (    
        <div className="border-[.5px] bg-white border-gray-300 cursor-default flex justify-center items-center text-center h-[50px] w-[150px]">
            {props.type === "time" ? `${props.data < 10 ? `0${props.data}` : props.data }:00 - ${props.data+1 < 10 ? `0${props.data+1}` : props.data+1}:00` :
             props.type === "courtHeader" ? <div className ="h-full w-full flex justify-center items-center font-semibold" >{`${props.data}`}</div> :
             props.type === "timeHeader" ? <div className ="h-full w-full flex justify-center items-center font-semibold" >Slots</div> :
             <div className="h-full w-full">

                {props.status === "available" ? 
                    <div className="relative flex justify-center items-center h-full w-full">
                        <div onClick={handleAdd} className="bg-green-300  hover:bg-green-400 transition-all cursor-pointer flex justify-center items-center h-full w-full">Available</div>
                       {showAddBooking &&  <AddBooking trigger = {props.trigger} courtID={props.courtID} selectedDate = {props.selectedDate} hour = {props.idx} slotTiming={`${props.idx < 10 ? `0${props.idx}` : props.idx }:00 - ${props.idx+1 < 10 ? `0${props.idx+1}` : props.idx+1}:00`} toggleVisible = {handleAdd}/>}
                    </div> :
                    <div className="h-full w-full flex justify-center items-center cursor-pointer bg-red-300 hover:bg-red-400 transition-all">
                        {props.data.bookedBy}
                    </div>
                }
            
            </div>}
        </div>
    );
}