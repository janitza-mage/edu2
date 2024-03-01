import {backendFetch, BackendFetchOptions} from "./backendFetch";
import {JsonObject, JsonValue} from "../../../common/util/JsonValue";

const TEXT_CONTENT_TYPE_PREFIX = "text/plain";
const JSON_CONTENT_TYPE = "application/json";

export class HttpJsonError extends Error {
  constructor(readonly httpCode: number, readonly body: JsonValue) {
    super(`backend returned response with http code ${httpCode} and JSON body`);
  }
}

async function handleResponse(response: Response): Promise<JsonValue> {
  const contentType = response.headers.get("Content-Type");
  if (contentType !== JSON_CONTENT_TYPE) {
    if (contentType && contentType.startsWith(TEXT_CONTENT_TYPE_PREFIX)) { // may contain charset
      throw new Error(`backend status ${response.status}: ${await response.text()}`);
    } else {
      throw new Error(`backend status ${response.status}, Content-Type: ${contentType}`);
    }
  }
  const jsonValue = await response.json();
  if (response.status !== 200) {
    throw new HttpJsonError(response.status, jsonValue);
  }
  return jsonValue;
}

export async function backendGet<T>(
    urlSuffix: string,
    options?: BackendFetchOptions,
): Promise<T> {
  return (await handleResponse(await backendFetch("GET", urlSuffix, null, options))) as T;
}

export async function backendPost<T>(
  urlSuffix: string,
  requestBody: JsonObject,
  options?: BackendFetchOptions,
): Promise<T> {
  return (await handleResponse(await backendFetch("POST", urlSuffix, requestBody, options))) as T;
}

export async function backendPut<T>(
  urlSuffix: string,
  requestBody: JsonObject,
  options?: BackendFetchOptions,
): Promise<T> {
  return (await handleResponse(await backendFetch("PUT", urlSuffix, requestBody, options))) as T;
}

export async function backendDelete<T>(
    urlSuffix: string,
    options?: BackendFetchOptions,
): Promise<T> {
  return (await handleResponse(await backendFetch("DELETE", urlSuffix, null, options))) as T;
}
