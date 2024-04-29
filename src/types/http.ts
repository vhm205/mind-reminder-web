export interface IHttpRequestConfig {
  server: {
    api: string;
    baseUrl: string;
    version: string;
    headers: Record<string, any>;
  };
}

export interface IExtraConfig {
	apiVersion: string;
	headers: Record<string, any>;
}

export interface IHttpResponse<T = any> {
  statusCode: number;
  code: string;
  data: T;
  metadata?: any;
  message: string;
}

