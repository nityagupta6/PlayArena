import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from 'axios';
export default function AddBooking({
    courtID,
    toggleVisible,
    slotTiming,
    selectedDate,
    hour,
    trigger
}){
    const [error,setError] = useState(false);
   
    function formatStartTime(hour) {
        const now = new Date(selectedDate); 
        now.setUTCHours(hour, 0, 0, 0);
        return now.toISOString();
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        let clientName = e.target.clientName.value;
        if(clientName.trim() === ""){
            setError(true);
            return;
        }
        else
        {
            const startTime = formatStartTime(hour);
            console.log(startTime);
            try{
                let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/booking/`,{
                    courtId: courtID, 
                    startTime: startTime,
                    name: clientName.trim(),
                })
                trigger(prev=>!prev);
                toggleVisible();
            }
            catch(e)
            {
                console.log(e);
            }
        }
    }
    useEffect(()=>{
        console.log(selectedDate);
    },[])
    return(
        <div className="fixed top-1/2 flex justify-center items-center left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md shadow-lg bg-white p-8 z-[100]">
            <div className="absolute top-0 m-2 font-semibold">
                {slotTiming}
            </div>
            <div onClick={toggleVisible} className= " text-2xl cursor-pointer absolute right-0 top-0 m-2">
                <IoMdClose />
            </div>
            <form onSubmit={handleSubmit} className="outlin">
                <div className="flex items-end gap-2 m-2">
                    <label className="font-semibold">
                        Name
                    </label>
                    <input onChange={()=>setError(false)} type="text" name="clientName" className={`${error?'outline-red-500 outline-1 border-white':''} outline-none  border-black px-2 py-1 hover:bg-gray-100 focus:bg-gray-100 transition-all border-b-[1px] border-black" type="text" name="clientName`}/>
                </div>
                <button className=" hover:bg-green-600 bg-green-500 text-white  transition-all px-2 py-1 " type="submit">Book Slot</button>
            </form>
        </div>
    );
}