export function getMonthLastDay (date: string) {
  const validate =  /^\d{4}-\d{2}$/.test(date);

  if (!validate) {
    return new Error('date字符串不合法');
  }
  const [year, month] = date.split('-');
  const lastDay = new Date(Number(year), Number(month), 0).getDate();

  return lastDay;
}