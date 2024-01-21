import {ExpressHandlerStarter, LowLevelRequest, LowLevelResponse} from "../LowLevel";
import {wrapAutoRespond} from "../wrapAutoRespond";
import {UnauthenticatedRequestCycle} from "./UnauthenticatedRequestCycle";

/**
 * The non-wrapped API handler type.
 */
export type UnauthenticatedApiHandler = (requestCycle: UnauthenticatedRequestCycle) => Promise<unknown>;

export type WrapUnauthenticatedApiOptions = {
  _dummy?: number;
};

export type WrapUnauthenticatedApiOptionsMaterialized = {
  _dummy: number;
};

const defaultOptions: WrapUnauthenticatedApiOptionsMaterialized = {
  _dummy: 0,
};

/**
 * Wraps a raw handler function and returns a handler as expected by Express.
 *
 * This variant is used for unauthenticated API methods that can be publicly called.
 */
export function wrapUnauthenticatedApi(
  handler: UnauthenticatedApiHandler,
  options?: WrapUnauthenticatedApiOptions | undefined,
): ExpressHandlerStarter {
  // noinspection JSUnusedLocalSymbols
  const materializedOptions: WrapUnauthenticatedApiOptionsMaterialized = { ...defaultOptions, ...(options ?? {}) };
  return wrapAutoRespond(async (request: LowLevelRequest, response: LowLevelResponse) => {
    return await handler({
      request,
      response,
      pathParameters: request.params as Record<string, string>,
      queryParameters: request.query as Record<string, string>,
    });
  });
}
