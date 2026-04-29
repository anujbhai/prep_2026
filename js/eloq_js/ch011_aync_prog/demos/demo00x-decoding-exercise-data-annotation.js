import { JSDOM } from "jsdom"

async function printGridFromDoc(url) {
  try {
    const response = await fetch(url)
    const html = await response.text()

    const dom = new JSDOM(html)
    const doc = dom.window.document
    const rows = Array.from(doc.querySelectorAll("table tr"))

    const positions = []
    let maxX = 0
    let maxY = 0

    for (const row of rows.slice(1)) {
      const cells = Array.from(row.querySelectorAll("td"))

      if (cells.length < 3) continue

      const x = Number(cells[0].textContent.trim())
      const char = cells[1].textContent.trim()
      const y = Number(cells[2].textContent.trim())

      if (Number.isNaN(x) || Number.isNaN(y) || !char) continue

      positions.push({ x, y, char })
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }

    console.log("Parsed positions:", positions.length)
    console.log("Grid size:", `${maxX + 1} x ${maxY + 1}`)

    const grid = Array.from({ length: maxY + 1 }, () =>
      Array(maxX + 1).fill(' ')
    )

    for (const { x, y, char } of positions) {
      grid[y][x] = char
    }

    for (const row of grid) {
      console.log(row.join(""))
    }
  } catch (error) {
    console.error("Error fetching or parsing document:", error)
  }
}

printGridFromDoc("https://docs.google.com/document/d/e/2PACX-1vSvM5gDlNvt7npYHhp_XfsJvuntUhq184By5xO_pA4b_gCWeXb6dM6ZxwN8rE6S4ghUsCj2VKR21oEP/pub")

