import { storeStatusCodes, getAllStatusCodes } from "./storage/kvStorage.ts";

const main = async () => {
  // ステータスコードを取得してKVに保存
  const stored = await storeStatusCodes();
  
  if (stored) {
    // 保存したデータを取得して表示
    const statusCodes = await getAllStatusCodes();
    console.log("Stored status codes:", statusCodes);
  } else {
    console.error("Failed to store status codes");
  }
}

main()