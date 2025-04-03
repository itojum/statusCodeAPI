import { fetchStatusCodes } from "../hooks/fetchStatusCodes.ts";
import { StatusCode } from "../types/types.ts";

const kv = await Deno.openKv();

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

export const getStatusCode = async (code: string): Promise<StatusCode | null> => {
  try {
    const result = await kv.get<StatusCode>(["statusCodes", code]);
    return result.value;
  } catch (error) {
    console.error("Error retrieving status code:", error);
    return null;
  }
};

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