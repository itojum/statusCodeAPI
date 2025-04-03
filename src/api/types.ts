import { StatusCode } from "../types/types.ts";

export type StatusRange = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

export type StatusCodeResponse = {
  data: StatusCode[];
  count: number;
};

export type ErrorResponse = {
  error: string;
  code: number;
}; 