import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { storeStatusCodes, getAllStatusCodes } from "./storage/kvStorage.ts";
import api from "./api/index.ts";
import { DAY } from "https://deno.land/std@0.208.0/datetime/mod.ts";

const port = 8000;

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

// 初回データ更新
await updateStatusCodes();

// 24時間ごとに更新
setInterval(updateStatusCodes, DAY);

// サーバー起動
console.log(`Server running at http://localhost:${port}`);
await serve(api.fetch, { port });