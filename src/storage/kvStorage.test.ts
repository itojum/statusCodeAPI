import { assertEquals, assertExists } from "jsr:@std/assert";
import { storeStatusCodes, getStatusCode, getAllStatusCodes } from "./kvStorage.ts";

Deno.test("storeStatusCodes - ステータスコードを正しく保存できる", async () => {
  const result = await storeStatusCodes();
  assertEquals(result, true);
});

Deno.test("getStatusCode - 特定のステータスコードを取得できる", async () => {
  const testCode = "200";
  const result = await getStatusCode(testCode);
  assertExists(result);
  assertEquals(result.statusCode, testCode);
});

Deno.test("getAllStatusCodes - すべてのステータスコードを取得できる", async () => {
  const result = await getAllStatusCodes();
  assertExists(result);
  assertEquals(Array.isArray(result), true);
  assertEquals(result.length > 0, true);
  // 型チェック
  const firstItem = result[0];
  assertExists(firstItem.statusCode);
  assertExists(firstItem.Description);
}); 