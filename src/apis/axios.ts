import axios from "axios";
import Cookie from "js-cookie";
import { IExtraConfig, IHttpRequestConfig } from "@/types/http";

const {
  VITE_ENV,
  VITE_API_URL,
  VITE_SERVER_URL,
  VITE_API_VERSION,
  VITE_API_URL_DEV,
  VITE_SERVER_URL_DEV,
} = import.meta.env;

const serverUrl: Record<string, string> = {
  development: VITE_SERVER_URL_DEV,
  production: VITE_SERVER_URL,
};
const apiUrl: Record<string, string> = {
  development: VITE_API_URL_DEV,
  production: VITE_API_URL,
};

export const defaultConfig: IHttpRequestConfig = {
  server: {
    api: apiUrl[VITE_ENV],
    baseUrl: serverUrl[VITE_ENV],
    version: VITE_API_VERSION,
    headers: {
      "Content-Type": "application/json",
    },
  },
};

class HttpRequest {
  private config: Partial<IExtraConfig> = {};

  public addVersion(v: string | boolean) {
    if (typeof v === "boolean" && v) {
      this.config.apiVersion = defaultConfig.server.version;
    } else if (typeof v === "string") {
      this.config.apiVersion = v;
    }

    return this.init();
  }

  public addHeaders(headers: Record<string, any>) {
    this.config.headers = headers;
  }

  public init() {
    const { apiVersion, headers } = this.config;
    const { api, headers: _headers } = defaultConfig.server;

    const options: Record<string, any> = {
      baseURL: api,
      headers: _headers,
      withCredentials: true,
      withXSRFToken: true,
    };

    if (apiVersion) {
      options.baseURL = `${api}/${apiVersion}`;
    }

    if (headers && Object.keys(headers).length) {
      Object.keys(headers).forEach((key) => {
        options.headers[key] = headers[key];
      });
    }

    const instance = axios.create(options);

    instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      function (response) {
        if (response.status === 204) {
          return {
            statusCode: response.status,
            statusText: response.statusText,
          };
        }

        return response.data;
      },
      function (error) {
        const resp = error.response;
        const data = resp?.data;

        if (data && data.path !== "/auth/check") {
          if (resp.status === 401 || resp.statusText === "Unauthorized") {
            Cookie.remove("isAuthenticated");
            window.location.replace("/auth/login");
          }
        }

        return data;
      },
    );

    return instance;
  }
}

const initHttpRequest = Object.freeze(new HttpRequest());

export const request = initHttpRequest.addVersion(true);
export default initHttpRequest;
