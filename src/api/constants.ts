import { StatusRange } from "./types.ts";

export const STATUS_CODE_RANGES: Record<StatusRange, (code: number) => boolean> = {
  "1xx": (code) => code >= 100 && code < 200,
  "2xx": (code) => code >= 200 && code < 300,
  "3xx": (code) => code >= 300 && code < 400,
  "4xx": (code) => code >= 400 && code < 500,
  "5xx": (code) => code >= 500 && code < 600,
} as const;

export const ERROR_MESSAGES = {
  NOT_FOUND: "Status code not found",
  INVALID_RANGE: "Invalid status code range",
} as const; 