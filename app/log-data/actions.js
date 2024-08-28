export function convert_time(time) {
  var hours = time.substring(0, 2);
  const minutes = time.substring(3, 5);

  hours = parseInt(hours);
  const suffix = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours == "00" ? 12 : hours;

  const t_hours = hours.toString();
  const new_time = t_hours.concat(":", minutes, " ", suffix);
  return new_time;
}

export function convert_date(date) {
  if (date[0] == 0) {
    return date[1];
  } else {
    return date;
  }
}
