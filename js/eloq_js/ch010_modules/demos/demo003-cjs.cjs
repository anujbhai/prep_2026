const ordinal = require("ordinal")
const { days, months } = require("date-names")

const week_day = function () {
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  return {
    name(number) { return names[number]; },
    number(name) { return names.indexOf(name); }
  }
}()

exports.format_date = function (date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear()
    if (tag == "M") return date.getMonth()
    if (tag == "MMM") return months[date.getMonth()]
    if (tag == "D") return date.getDate()
    if (tag == "Do") return ordinal(date.getDate())
    if (tag == "dddd") return days[date.getDay()]
  })
}

console.log(week_day.name(week_day.number("Sunday")))