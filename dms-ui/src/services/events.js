const events = 
[{
  heading:"Upcoming Events",
   events:[ 
     {
        id:"1",
        eventName: "Berwick Baptist Hymn Sing",
        address: "Williams",
        time: "andrew.williams@dal.ca",
        date : "APR 28th", 
        fees : "free",
        contactNo: "+19999999999",
        hostname:"Andrew William",
        hostDesignation:"artist, Dalhousie University",
        seats:"23",
        eventDetails:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugit est molestiae quisquam, error ea veniam doloribus debitis sapiente iure aspernatur ab dolorem illum quidem doloremque? Labore aliquid natus odit. Illo nemo asperiores quasi similique cupiditate maiores totam.",
        image:'/events.svg'
    },
    {
        id:"2",
        eventName: "Colby community Church",
        address: "Williams",
        time: "andrew.williams@dal.ca",
        date : "JUN 28th", 
        fees : "paid $125",
        contactNo: "+19999999999",
        hostname:"Andrew William",
        hostDesignation:"artist, Dalhousie University",
        seats:"53",
        eventDetails:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugit est molestiae quisquam, error ea veniam doloribus debitis sapiente iure aspernatur ab dolorem illum quidem doloremque? Labore aliquid natus odit. Illo nemo asperiores quasi similique cupiditate maiores totam.",
        image:'/events.svg'
    },
    {
      id:"3",
        eventName: "Colby community Church",
        address: "Williams",
        time: "james.thorn@dal.ca",
        date : "APR 28th", 
        fees : "paid $125",
        contactNo: "+19999999999",
        hostname:"James Thorn",
        hostDesignation:"artist, Dalhousie University",
        seats:"89",
        eventDetails:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugit est molestiae quisquam, error ea veniam doloribus debitis sapiente iure aspernatur ab dolorem illum quidem doloremque? Labore aliquid natus odit. Illo nemo asperiores quasi similique cupiditate maiores totam.",
        image:'/events.svg'
    },
    {
        id:"3",
        eventName: "Colby community Church",
        address: "Williams",
        time: "james.thorn@dal.ca",
        date : "APR 28th", 
        fees : "paid $125",
        contactNo: "+19999999999",
        hostname:"James Thorn",
        hostDesignation:"artist, Dalhousie University",
        seats:"89",
        eventDetails:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam fugit est molestiae quisquam, error ea veniam doloribus debitis sapiente iure aspernatur ab dolorem illum quidem doloremque? Labore aliquid natus odit. Illo nemo asperiores quasi similique cupiditate maiores totam.",
        image:'/events.svg'
  }]
}]

  
  export const getEvents = () => {
    
    return events;
  };
  export const getEvent = (id) => {
    for(let i=0;i<events.length;i++){
    
    return events[i].events.filter((event) => id === event.id)[0]
}
  };

