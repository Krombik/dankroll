import axios, { AxiosResponse } from "axios";

const fetcher = {
  async get<T>(url: string) {
    try {
      return { res: (await axios.get<T>(url)).data };
    } catch (error) {
      const { status } = error.response as AxiosResponse;
      return { status };
    }
  },
  async delete<T>(url: string) {
    try {
      return { res: (await axios.delete<T>(url)).data };
    } catch (error) {
      const { status } = error.response as AxiosResponse;
      return { status };
    }
  },
  async post<T>(url: string, content?: any) {
    try {
      const { data } = await (content
        ? axios.post<T>(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        : axios.post<T>(url));
      return { res: data };
    } catch (error) {
      const { status } = error.response as AxiosResponse;
      return { status };
    }
  },
  async put<T>(url: string, content?: any) {
    try {
      const { data } = await (content
        ? axios.put<T>(url, JSON.stringify(content), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        : axios.put<T>(url));
      return { res: data };
    } catch (error) {
      const { status } = error.response as AxiosResponse;
      return { status };
    }
  },
};

export default fetcher;
