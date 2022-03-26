const appointments = [
  {
    id: "1",
    chaplain: {
      user: {
        id: 4,
        email: "userchaplain@gmail.com",
        first_name: "User",
        last_name: "Chaplain",
        is_staff: true,
      },
    },
    status: "pending",
    slot: "2022-03-28T15:00:00Z",
  },
  {
    id: "2",
    name: "Andrew Williams",
    status: "cancelled",
    slot: "2022-03-30T14:00:00Z",
    chaplain: {
      user: {
        id: 4,
        email: "userchaplain@gmail.com",
        first_name: "User1",
        last_name: "Chaplain1",
        is_staff: true,
      },
    },
  },
  {
    id: "3",
    status: "confirmed",
    slot: "2022-03-30T14:00:00Z",
    chaplain: {
      user: {
        id: 4,
        email: "userchaplain@gmail.com",
        first_name: "User2",
        last_name: "Chaplain2",
        is_staff: true,
      },
    },
  },
];

export const getAppointments = () => {
  return appointments;
};
