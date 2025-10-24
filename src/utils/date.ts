export const formatDate = (inputDate: string) => {
  // Check if inputDate is valid
  if (!inputDate || typeof inputDate !== "string") {
    return "Ngày không hợp lệ";
  }

  let date;

  // Check if the input is in DD/MM/YYYY format
  if (inputDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    const [day, month, year] = inputDate.split("/").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(inputDate);
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Ngày không hợp lệ";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
