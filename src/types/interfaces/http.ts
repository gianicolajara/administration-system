import { httpError } from "./httpError";

export type httpMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export interface IAxiosErrorResponse {
  message?: string;
  success?: boolean;
}

export interface IUseFetchReturn<T> {
  error: httpError | null;
  loading: boolean;
  data: T;
  refresh: () => void;
  successfully: boolean;
}

export interface IUseFetch {
  url?: string;
  method: httpMethods;
  body?: object;
  start?: boolean;
}
