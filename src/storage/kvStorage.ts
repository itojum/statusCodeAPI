import { fetchStatusCodes } from "../hooks/fetchStatusCodes.ts";
import { StatusCode } from "../types/types.ts";

// Deno KVデータベースの初期化
const kv = await Deno.openKv();

// ステータスコードデータをKVストレージに保存
// 成功時はtrue、失敗時はfalseを返す
export const storeStatusCodes = async (): Promise<boolean> => {
  try {
    const statusCodes = await fetchStatusCodes();
    
    // 各ステータスコードをKVに保存
    for (const code of statusCodes) {
      await kv.set(["statusCodes", code.statusCode], code);
    }
    
    console.log("Successfully stored status codes in KV");
    return true;
  } catch (error) {
    console.error("Error storing status codes:", error);
    return false;
  }
};

// 特定のステータスコードを取得
// 存在しない場合はnullを返す
export const getStatusCode = async (code: string): Promise<StatusCode | null> => {
  try {
    const result = await kv.get<StatusCode>(["statusCodes", code]);
    return result.value;
  } catch (error) {
    console.error("Error retrieving status code:", error);
    return null;
  }
};

// 全ステータスコードを取得
// エラー時は空配列を返す
export const getAllStatusCodes = async (): Promise<StatusCode[]> => {
  try {
    const entries = kv.list<StatusCode>({ prefix: ["statusCodes"] });
    const statusCodes: StatusCode[] = [];
    for await (const entry of entries) {
      statusCodes.push(entry.value);
    }
    return statusCodes;
  } catch (error) {
    console.error("Error retrieving all status codes:", error);
    return [];
  }
}; 