export const datetimeToString = datetime =>
  datetime.toISOString().split('T')[0];

export const dateStringToObject = dateStr =>
  new Date(Date.parse(dateStr));
