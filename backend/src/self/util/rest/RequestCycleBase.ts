import { LowLevelRequest, LowLevelResponse } from "./LowLevel";

export interface RequestCycleBase {
  // low-level objects
  request: LowLevelRequest;
  response: LowLevelResponse;

  // request parameters
  pathParameters: Record<string, string>;
  queryParameters: Record<string, string>;
}
