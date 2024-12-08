import CalendarItem from "../misc/calendarItem"
import { useEffect,useState } from "react";
export default function TimeColumn(){
    const [columnList,setColumnList] = useState([]);
    useEffect(() => {
        for(let i=0;i<25;i++){
            if(i==0)
            {
                setColumnList(columnList=>[...columnList,<CalendarItem key={i} type="timeHeader"/>]);
            }
            else
            setColumnList(columnList=>[...columnList,<CalendarItem key={i-1} type="time" data={i-1}/>]);
        }
    },[])
    return (
        <div className="">
            {columnList}
        </div>
    )
}