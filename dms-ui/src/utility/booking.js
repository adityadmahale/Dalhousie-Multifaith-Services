export const getCurrentWeekDates = () => {
  const currentDay = new Date();
  const week = [];
  const time = [14, 15, 16, 17];

  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < time.length; j++) {
      const first = currentDay.getDate() - currentDay.getDay() + i;
      const day = new Date(currentDay.setDate(first));
      day.setUTCHours(time[j], 0, 0, 0);
      week.push(day);
    }
  }
  return week;
};

export const isSlotEqual = (slot, selectedSlot) => {
  return (
    selectedSlot !== null &&
    slot !== null &&
    selectedSlot.getTime() === slot.getTime()
  );
};

export const isSlotInPast = (slot) => {
  const current = new Date();
  return current.getTime() >= slot.getTime();
};
