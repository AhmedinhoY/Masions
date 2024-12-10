export const formatTime = (timestamp) => {
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Format the time
};
