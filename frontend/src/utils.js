export const datetimeToString = datetime =>
  datetime.toISOString().split('T')[0];
