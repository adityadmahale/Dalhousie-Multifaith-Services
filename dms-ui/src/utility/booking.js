export const getCurrentWeekDates = () => {
  const currentDay = new Date();
  const week = [];

  for (let i = 1; i <= 5; i++) {
    let first = currentDay.getDate() - currentDay.getDay() + i;
    let day = new Date(currentDay.setDate(first));
    week.push(day);
  }
  return week;
};

export const getTimeRanges = () => {
  const slots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
  ];
  return slots;
};
