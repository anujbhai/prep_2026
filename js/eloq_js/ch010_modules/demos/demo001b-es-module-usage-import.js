// import { day_name } from "./demo001-es-modules-usage.js"
import { day_name as nom_de_jour } from "./demo001-es-modules-usage.js"
import season_names from "./demo001a-es-modules-usage.js"

let now = new Date()
console.log(`Today is ${nom_de_jour(now.getDay())}`)
console.log(nom_de_jour(3))
console.log(season_names)