export const environment = {
  production: false,
  USE_PROXY: true,
  PROXY_PATH: "http://localhost:8080/api/generate-image",
  REQUEST_TIMEOUT_MS: 120_000,
  MAX_PROMPT_LENGTH: 1200,
};
