export const parseDate = (date) => {
  const [year, month, day] = date.substr(0, 10).split("-");
  return new Date(year, month - 1, day);
};
