import {commonSystemConfiguration} from "../../common/commonSystemConfiguration";

export async function backendGet(urlSuffix: string): Promise<any> {
  const url = commonSystemConfiguration.frontendBackendBaseUrl + "/" + urlSuffix;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("unexpected HTTP status: " + response.status + ", body: " + (await response.text()));
  }
  if (response.headers.get("Content-Type") !== "application/json") {
    throw new Error("unexpected response content-type: " + response.headers.get("Content-Type") + ", body: " + (await response.text()));
  }
  return response.json();
}
