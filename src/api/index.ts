import { Hono } from "hono";
import { getAllStatusCodesHandler, getStatusCodeHandler } from "./handlers.ts";

const app = new Hono();

// ベースパスのルーター
const router = new Hono()
  .get("/", getAllStatusCodesHandler)
  .get("/:code", getStatusCodeHandler);

// ベースパスを設定
app.route("/status-codes", router);

export default app; 