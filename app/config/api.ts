export interface ApiConfig {
  baseUrl: string;
  useMockData: boolean;
  suppressErrors: boolean;
  logRequests: boolean;
  logErrors: boolean;
}

export const API_CONFIG: ApiConfig = {
  baseUrl: "http://localhost:8000/",
  useMockData: false,
  suppressErrors: false,
  logRequests: true,
  logErrors: true,
};
