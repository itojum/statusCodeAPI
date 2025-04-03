import type { Context } from "hono";
import { getStatusCode, getAllStatusCodes } from "../storage/kvStorage.ts";
import { StatusRange, StatusCodeResponse, ErrorResponse } from "./types.ts";
import { STATUS_CODE_RANGES, ERROR_MESSAGES } from "./constants.ts";

export const getAllStatusCodesHandler = async (c: Context) => {
  const range = c.req.query("range") as StatusRange;
  const statusCodes = await getAllStatusCodes();
  
  if (range && range in STATUS_CODE_RANGES) {
    const rangeFilter = STATUS_CODE_RANGES[range];
    const filteredCodes = statusCodes.filter(code => 
      rangeFilter(parseInt(code.statusCode))
    );
    return c.json<StatusCodeResponse>({
      data: filteredCodes,
      count: filteredCodes.length,
    });
  }
  
  return c.json<StatusCodeResponse>({
    data: statusCodes,
    count: statusCodes.length,
  });
};

export const getStatusCodeHandler = async (c: Context) => {
  const code = c.req.param("code");
  const statusCode = await getStatusCode(code);
  
  if (!statusCode) {
    return c.json<ErrorResponse>({
      error: ERROR_MESSAGES.NOT_FOUND,
      code: 404,
    }, 404);
  }
  
  return c.json(statusCode);
}; 