import axios, { AxiosError, AxiosResponse } from "axios";

import { toast } from "react-toastify";
import { myHistory } from "./history";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response!;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (let key in data.errors) {
            const error = data.errors[key];
            if (error) {
              modelStateErrors.push(error);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        // myHistory.replace("/server-error");
        myHistory.replace("/server-error", { error: data });

        break;

      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};
const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => {
    return requests.get("buggy/bad-request");
  },
  get401Error: () => {
    return requests.get("buggy/un-authorized");
  },
  get404Error: () => {
    return requests.get("buggy/not-found");
  },
  getValidationError: () => {
    return requests.get("buggy/validation-error");
  },
  get500Error: () => {
    return requests.get("buggy/server-error");
  },
};
const agent = {
  Catalog,
  TestErrors,
};

export default agent;
