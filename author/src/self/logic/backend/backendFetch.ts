import {JsonObject} from "../../../common/util/JsonValue";
import {commonSystemConfiguration} from "../../../common/commonSystemConfiguration";

const MAX_RETRIES = 5;

export type BackendFetchOptions = {
  sendAuthorizationHeader?: boolean;
};

async function getFullUrl(urlSuffix: string): Promise<string> {
  return commonSystemConfiguration.authorBackendBaseUrl + (urlSuffix.startsWith("/") ? "" : "/") + urlSuffix;
}

async function getAuthorizationHeader(): Promise<string> {
  // TODO do not hardcode author 1
  // TODO use an actual secure token
  return "Bearer 1";
}

export async function backendFetch(
  method: string,
  urlSuffix: string,
  requestBody: JsonObject | null,
  options?: BackendFetchOptions,
): Promise<Response> {
  // normalize options
  const effectiveOptions = options ? { ...options } : {};
  effectiveOptions.sendAuthorizationHeader = effectiveOptions.sendAuthorizationHeader ?? true;

  // prepare requests
  const [url, authorizationHeader] = await Promise.all([
    getFullUrl(urlSuffix),
    effectiveOptions.sendAuthorizationHeader ? getAuthorizationHeader() : null,
  ]);
  const requestInit: RequestInit = {
    method,
    ...(requestBody ? {body: JSON.stringify(requestBody)} : {}),
    headers: {
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
      ...(requestBody ? {"Content-Type": "application/json"} : {}),
    },
  };

  // send the actual request in a retry loop
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await fetch(url, requestInit);
      if (response.status !== 429) {
        // if a "normal" response (non-preflight) has status code 429: retry
        return response;
      }
    } catch (error) {
      // this happens for network errors, and also if the service is overloaded and responds to a CORS
      // preflight request with a 429 response. So let's just retry.
    }
  }

  // retried too often
  throw new Error(`failed to connect to backend API, url: ${url}`);
}
