import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";


const scrapingUrl = "https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml";

export const fetchStatusCodes = async () => {
  const resp = await fetch(scrapingUrl)
  const source = await resp.text()
  const DOM = new DOMParser().parseFromString(source, "text/html")
  const table = DOM.querySelector("table")
  const rows = table?.querySelectorAll("tr") || []

  const statusCodes = []

  for (const row of rows) {
    const cells = row.querySelectorAll("td")
    if (cells.length < 3) {
      continue
    }
    
    const statusCode = cells[0].textContent
    const Description  = cells[1].textContent

    if(Description.includes("Unassigned")) {
      continue
    }

    statusCodes.push({
      statusCode,
      Description
    })
  }

  return statusCodes
}