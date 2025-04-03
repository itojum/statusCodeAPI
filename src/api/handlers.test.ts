import { assertEquals } from "jsr:@std/assert";
import { Hono } from "hono";
import { getAllStatusCodesHandler, getStatusCodeHandler } from "./handlers.ts";
import { StatusRange } from "./types.ts";

// テスト用のHonoアプリケーションを作成
const app = new Hono();

// テスト用のルートを設定
app.get("/status-codes", getAllStatusCodesHandler);
app.get("/status-codes/:code", getStatusCodeHandler);

Deno.test("getAllStatusCodesHandler - 全ステータスコードを取得できる", async () => {
  const req = new Request("http://localhost/status-codes");
  const res = await app.request(req);
  
  assertEquals(res.status, 200);
  const data = await res.json();
  assertEquals(Array.isArray(data.data), true);
  assertEquals(typeof data.count, "number");
});

Deno.test("getAllStatusCodesHandler - 範囲指定でフィルタリングできる", async () => {
  const range: StatusRange = "2xx";
  const req = new Request(`http://localhost/status-codes?range=${range}`);
  const res = await app.request(req);
  
  assertEquals(res.status, 200);
  const data = await res.json();
  const filteredCodes = data.data.filter((code: any) => 
    code.statusCode.startsWith("2")
  );
  assertEquals(filteredCodes.length, data.count);
});

Deno.test("getStatusCodeHandler - 存在するステータスコードを取得できる", async () => {
  const testCode = "200";
  const req = new Request(`http://localhost/status-codes/${testCode}`);
  const res = await app.request(req);
  
  assertEquals(res.status, 200);
  const data = await res.json();
  assertEquals(data.statusCode, testCode);
  assertEquals(typeof data.Description, "string");
});

Deno.test("getStatusCodeHandler - 存在しないステータスコードは404を返す", async () => {
  const testCode = "999";
  const req = new Request(`http://localhost/status-codes/${testCode}`);
  const res = await app.request(req);
  
  assertEquals(res.status, 404);
  const data = await res.json();
  assertEquals(data.error, "Unassigned");
  assertEquals(data.code, 404);
}); 