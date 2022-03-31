import http from "./httpService";

const eventsAPIEndpoint = "/dmsfront/events/";
const addEventAPIEndpoint = "/dmsfront/addevent/";

export const getEvents = () => {
  return http.get(`${eventsAPIEndpoint}`);
};

export const addEvent = (event) => {
  const date = `${event.date}T${event.time}:00Z`;
  return http.post(`${addEventAPIEndpoint}`, {
    event_title: event.eventName,
    event_date: date,
    event_location: event.address,
    event_description: event.eventDetails,
    available_seats: event.seats,
    host_name: event.hostname,
    host_details: event.hostDesignation,
  });
};

export const updateEvent = (id) => {
  return http.put(`${eventsAPIEndpoint}${id}/book`);
};
