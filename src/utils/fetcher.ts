import axios, { AxiosResponse } from "axios";
import { FetchRV } from "../types";

const fetcher = {
  async get<T>(url: string): Promise<FetchRV<T>> {
    try {
      return { res: (await axios.get(url)).data };
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { res: data, status };
    }
  },
  async delete<T>(url: string): Promise<FetchRV<T>> {
    try {
      return { res: (await axios.delete(url)).data };
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { res: data, status };
    }
  },
  async post<T>(url: string, content?: any): Promise<FetchRV<T>> {
    try {
      const { data } = await (content
        ? axios.post(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        : axios.post(url));
      return { res: data };
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { res: data, status };
    }
  },
  async put<T>(url: string, content?: any): Promise<FetchRV<T>> {
    try {
      const { data } = await (content
        ? axios.put(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        : axios.put(url));
      return { res: data };
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { res: data, status };
    }
  },
};

export default fetcher;
