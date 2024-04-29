import axios from "axios";
import Cookie from "js-cookie";
import { IExtraConfig, IHttpRequestConfig } from "@/types/http";

export const defaultConfig: IHttpRequestConfig = {
	server: {
		api: import.meta.env.VITE_API_URL,
		baseUrl: import.meta.env.VITE_SERVER_URL,
		version: import.meta.env.VITE_API_VERSION,
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
		const { api } = defaultConfig.server;

		const options: Record<string, any> = {
			baseURL: api,
			headers: {
				"Content-type": "application/json",
			},
			withCredentials: true,
			withXSRFToken: true,
		};

		if (apiVersion) {
			options.baseURL = `${api}/${apiVersion}`;
		}

		if (headers && Object.keys(headers).length) {
			options.headers = { ...headers };
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
			}
		);

		instance.interceptors.response.use(
			function (response) {
				return response.data;
			},
			function (error) {
				const resp = error.response;
				const data = resp.data;

				if (data.path !== "/auth/check") {
					if (resp.status === 401 || resp.statusText === "Unauthorized") {
            Cookie.remove('isAuthenticated');
						window.location.replace("/login");
					}
				}

				return data;
			}
		);

		return instance;
	}
}

const initHttpRequest = Object.freeze(new HttpRequest());

export const request = initHttpRequest.addVersion(true);
export default initHttpRequest;
