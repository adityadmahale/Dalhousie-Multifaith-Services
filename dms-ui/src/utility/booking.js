export const getCurrentWeekDates = () => {
  const currentDay = new Date();
  const week = [];

  // Switch to next week by incrementing two days if current day is Friday after 1pm
  if (
    (currentDay.getDay() === 5 && currentDay.getHours() >= 13) ||
    currentDay.getDay() === 6
  ) {
    currentDay.setDate(currentDay.getDate() + 2);
  }

  // Generate four start times for the given day
  const slotTimeStart = [10, 11, 12, 13].map(
    (timing) => timing + currentDay.getTimezoneOffset() / 60
  );

  // Consolidate weekly slot times
  for (let i = 1; i <= 5; i++) {
    for (const timeStart of slotTimeStart) {
      const first = currentDay.getDate() - currentDay.getDay() + i;
      const day = new Date(currentDay.setDate(first));
      day.setUTCHours(timeStart, 0, 0, 0);
      week.push(day);
    }
  }
  return week;
};

// Checks if the given slots timestamps are equal
export const isSlotEqual = (slot, selectedSlot) => {
  return (
    selectedSlot !== null &&
    slot !== null &&
    selectedSlot.getTime() === slot.getTime()
  );
};

// Check if the passed slot time exists in the past
export const isSlotInPast = (slot) => {
  const current = new Date();
  return current.getTime() >= slot.getTime();
};

// Checks if the slot is already booked
export const isSlotBooked = (slot, bookedSlots) => {
  return bookedSlots.some((bookedSlot) => {
    if (bookedSlot.status === "cancelled") return false;
    return isSlotEqual(new Date(bookedSlot.slot), slot);
  });
};

// Generate slot ranges based on the given start time
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
