const appointments = [
    {
      id: "#DAL234567",
      name: "Andrew Williams",
      title: "Health Specialist",
      status:'confirmation pending'  ,
      date:'23/08/2022',
      time:'8:00 AM to 9:00 AM'
    },
    {
        id: "#DAL234567",
        name: "Andrew Williams",
        title: "Health Specialist",
      status:'cancelled' ,
      date:'23/08/2022',
      time:'8:00 AM to 9:00 AM'
    },
    {
        id: "#DAL234567",
        name: "Andrew Williams",
        title: "Health Specialist",
      status:'confirmed' ,
      date:'23/08/2022',
      time:'8:00 AM to 9:00 AM'
    },
    
  ];
  
export const getAppointments = () => {
    return appointments;
};
  

  