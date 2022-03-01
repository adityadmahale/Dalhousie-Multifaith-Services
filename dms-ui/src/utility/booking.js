export const getCurrentWeekDates = () => {
  const currentDay = new Date();
  const week = [];

  const slotTimeStart = [10, 11, 12, 13].map(
    (timing) => timing + currentDay.getTimezoneOffset() / 60
  );

  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < slotTimeStart.length; j++) {
      const first = currentDay.getDate() - currentDay.getDay() + i;
      const day = new Date(currentDay.setDate(first));
      day.setUTCHours(slotTimeStart[j], 0, 0, 0);
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

export const isSlotBooked = (slot, bookedSlots) => {
  return bookedSlots.some((bookedSlot) =>
    isSlotEqual(new Date(bookedSlot.slot), slot)
  );
};

export const getSlotRange = (time) => {
  const startTime = getTime(time);
  const endTime = getTime(time + 1);
  return `${startTime} - ${endTime}`;
};

const getTime = (time) => {
  if (time === 12) {
    return "12 PM";
  }
  if (time > 12) {
    return `${time - 12} PM`;
  }

  return `${time} AM`;
};
