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
      return (await axios.delete(url)).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, error: status };
    }
  },
  async post<T>(url: string, content?: any): Promise<FetchRV<T>> {
    try {
      if (content)
        return (
          await axios.post(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).data;
      return (await axios.post(url)).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, error: status };
    }
  },
  async put<T>(url: string, content?: any): Promise<FetchRV<T>> {
    try {
      if (content)
        return (
          await axios.put(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).data;
      return (await axios.put(url)).data;
    } catch (error) {
      const { data, status } = error.response as AxiosResponse;
      return { ...data, error: status };
    }
  },
};

export default fetcher;
