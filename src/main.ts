import { storeStatusCodes, getAllStatusCodes } from "./storage/kvStorage.ts";
import { DAY } from "https://deno.land/std@0.208.0/datetime/mod.ts";

const updateStatusCodes = async () => {
  console.log("Starting status codes update...");
  const stored = await storeStatusCodes();
  
  if (stored) {
    const statusCodes = await getAllStatusCodes();
    console.log("Current status codes count:", statusCodes.length);
  } else {
    console.error("Failed to update status codes");
  }
};

// 初回実行
updateStatusCodes();

// 24時間ごとに更新
setInterval(updateStatusCodes, DAY);

// アプリケーションを継続実行
console.log("Status code updater is running. Updates will occur every 24 hours.");