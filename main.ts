import { fetchStatusCodes } from "./fetchStatusCodes.ts";


const main = async () => {
  const statusCodes = await fetchStatusCodes()
  console.log(statusCodes)
}

main()