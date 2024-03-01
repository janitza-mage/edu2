import {FinishRequest} from "../FinishRequest";
import {ExpressHandlerStarter, LowLevelRequest, LowLevelResponse} from "../LowLevel";
import {AuthorRequestCycle} from "./AuthorRequestCycle";
import {wrapAutoRespond} from "../wrapAutoRespond";

// the non-wrapped API handler type
export type AuthorApiHandler = (requestCycle: AuthorRequestCycle) => Promise<unknown>;

export type WrapAuthorApiOptions = {
  _dummy?: number;
};

export type WrapAuthorApiOptionsMaterialized = {
  _dummy: number;
};

const defaultOptions: WrapAuthorApiOptionsMaterialized = {
  _dummy: 0,
};

/**
 * Wraps a raw handler function and returns a handler as expected by Express.
 */
export function wrapAuthorApi(
  handler: AuthorApiHandler,
  _options?: WrapAuthorApiOptions | undefined,
): ExpressHandlerStarter {
  // const materializedOptions: WrapAuthorApiOptionsMaterialized = { ...defaultOptions, ...(options ?? {}) };
  return wrapAutoRespond(async (request: LowLevelRequest, response: LowLevelResponse) => {
    const authorId = await getAuthorIdFromRequest(request, defaultOptions);
    return await handler({
      request,
      response,
      pathParameters: request.params as Record<string, string>,
      queryParameters: request.query as Record<string, string>,
      authorId,
    });
  });
}

async function getAuthorIdFromRequest(
  request: LowLevelRequest,
  _options: WrapAuthorApiOptionsMaterialized,
): Promise<number> {
  if (!request.headers.authorization) {
    throw FinishRequest.authenticationFailed();
  }
  const segments = request.headers.authorization.split(" ");
  if (segments.length !== 2 || segments[0] !== "Bearer") {
    throw FinishRequest.authenticationFailed();
  }
  const token = segments[1];
  // TODO actually use a token
  return parseInt(token, 10);
}
