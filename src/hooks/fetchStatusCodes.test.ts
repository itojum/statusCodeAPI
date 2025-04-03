import { assertEquals, assertExists } from "jsr:@std/assert";
import { fetchStatusCodes } from "./fetchStatusCodes.ts";

Deno.test("fetchStatusCodes - ステータスコードを正しく取得できる", async () => {
  const statusCodes = await fetchStatusCodes();
  
  // 結果が配列であることを確認
  assertEquals(Array.isArray(statusCodes), true);
  assertExists(statusCodes.length > 0);
  
  // 最初の要素の構造を確認
  const firstCode = statusCodes[0];
  assertExists(firstCode.statusCode);
  assertExists(firstCode.Description);
  
  // 未割り当てのコードが除外されていることを確認
  const hasUnassigned = statusCodes.some(code => 
    code.Description.includes("Unassigned")
  );
  assertEquals(hasUnassigned, false);
  
  // 一般的なステータスコードが含まれていることを確認
  const commonCodes = ["200", "404", "500"];
  const hasCommonCodes = commonCodes.every(code => 
    statusCodes.some(item => item.statusCode === code)
  );
  assertEquals(hasCommonCodes, true);
}); 