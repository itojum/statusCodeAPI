import { Hono } from "hono";
import { getStatusCode, getAllStatusCodes } from "../storage/kvStorage.ts";
import { StatusCode } from "../types/types.ts";

const app = new Hono();

// すべてのステータスコードを取得
app.get("/", async (c) => {
  const statusCodes = await getAllStatusCodes();
  return c.json(statusCodes);
});

// 特定のステータスコードを取得
app.get("/:code", async (c) => {
  const code = c.req.param("code");
  const statusCode = await getStatusCode(code);
  
  if (!statusCode) {
    return c.json({ error: "Status code not found" }, 404);
  }
  
  return c.json(statusCode);
});

export default app; 