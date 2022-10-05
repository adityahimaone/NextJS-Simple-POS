import axios, { Method, AxiosResponse } from "axios";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const request = <T>(
  method: Method,
  url: string,
  data?: any
): Promise<AxiosResponse<T>> =>
  api.request<T>({
    method,
    url,
    data,
  });

export default request;
