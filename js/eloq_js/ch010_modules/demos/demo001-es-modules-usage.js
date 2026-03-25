const names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function day_name(number) {
  return names[number]
}

export function day_number(name) {
  return names.indexOf(name)
}