import { useEffect, useState } from "react";
import {getEvents} from "../services/events"; 
import EventsCard from "./eventsCard";
const Events = () => {
    const [events, setEvents] = useState([])
    useEffect(()=>{
        console.log(getEvents())
        setEvents(getEvents()); 
    })
   
    return (
        <>
            {events.map((event,index)=>(
                <div key="index" className="mb-4">
                <div className="p-2 mb-2"><h4  style={{color:'#727272'}}>{event.heading}</h4></div>
           
                <div  className="d-flex flex-wrap" >
                {
                    event.events.map((data, index) => (                         
                            <EventsCard key={index} data={data}/>
                    ))
                }
                  </div>
                  </div>
            ))}
        </>
    );
};


export default Events; 