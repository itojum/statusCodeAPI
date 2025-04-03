import { Hono } from "hono";
import { getStatusCode, getAllStatusCodes } from "../storage/kvStorage.ts";

const app = new Hono();

const statusCodeRanges = {
  "1xx": (code: number) => code >= 100 && code < 200,
  "2xx": (code: number) => code >= 200 && code < 300,
  "3xx": (code: number) => code >= 300 && code < 400,
  "4xx": (code: number) => code >= 400 && code < 500,
  "5xx": (code: number) => code >= 500 && code < 600,
} as const;

type StatusRange = keyof typeof statusCodeRanges;

// ベースパスのルーター
const router = new Hono()
  // すべてのステータスコードを取得
  .get("/", async (c) => {
    const range = c.req.query("range") as StatusRange;
    const statusCodes = await getAllStatusCodes();
    
    if (range && range in statusCodeRanges) {
      const rangeFilter = statusCodeRanges[range];
      const filteredCodes = statusCodes.filter(code => 
        rangeFilter(parseInt(code.statusCode))
      );
      return c.json(filteredCodes);
    }
    
    return c.json(statusCodes);
  })
  // 特定のステータスコードを取得
  .get("/:code", async (c) => {
    const code = c.req.param("code");
    const statusCode = await getStatusCode(code);
    
    if (!statusCode) {
      return c.json({ error: "Status code not found" }, 404);
    }
    
    return c.json(statusCode);
  });

// ベースパスを設定
app.route("/status-codes", router);

export default app; 