// returns numbers from 1 to 7 where 1 is Monday and 7 is Sunday.
export default function(year, month, day) {
  const weekDay = new Date(`${year}-${month}-${day}`).getDay();
  return weekDay === 0 ? 7 : weekDay;
}
