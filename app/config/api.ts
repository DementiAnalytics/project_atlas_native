export interface ApiConfig {
  baseUrl: string;
  logRequests: boolean;
  logErrors: boolean;
}

// Normalise the backend URL: add http:// if missing, strip trailing slash.
// Set EXPO_PUBLIC_AZURE_BACKEND to the full origin, e.g. http://20.172.129.92:8000
const getBackendUrl = (): string => {
  const raw = process.env.EXPO_PUBLIC_AZURE_BACKEND;
  if (!raw) return 'http://localhost:8000';
  const withProtocol = raw.startsWith('http') ? raw : `http://${raw}`;
  return withProtocol.replace(/\/$/, '');
};

export const API_CONFIG: ApiConfig = {
  baseUrl: getBackendUrl(),
  logRequests: process.env.EXPO_PUBLIC_LOG_REQUESTS !== 'false',
  logErrors: process.env.EXPO_PUBLIC_LOG_ERRORS !== 'false',
};
