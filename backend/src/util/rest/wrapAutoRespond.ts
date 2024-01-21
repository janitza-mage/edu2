import {FinishRequest} from "./FinishRequest";
import {ExpressHandlerStarter, LowLevelRequest, LowLevelResponse} from "./LowLevel";
import {background} from "../../common/util/background";
import {getErrorStackTraceAsString} from "../../common/util/getErrorStackTraceAsString";

/**
 * If this object is returned from a handler, the framework assumes that a response has already been sent.
 */
export const ALREADY_RESPONDED = {};

type Handler = (request: LowLevelRequest, response: LowLevelResponse) => Promise<unknown>;

/**
 * This is a low-level wrapping function that takes a request handler and generates a response based on its return
 * value or exception. Depending on the type of exception, this method will also write a message to the server log.
 */
export function wrapAutoRespond(handler: Handler): ExpressHandlerStarter {
  // return a function that starts the promise but does not return it -- express wants void, and TS would complain
  return (_request: any, _response: any) => {
    background(
      // eslint-disable-next-line complexity
      (async (): Promise<void> => {
        const request = _request as LowLevelRequest;
        const response = _response as LowLevelResponse;
        try {
          if (request.method === "POST" || request.method === "PUT") {
            const actualContentType = getContentTypeWithoutDirectives(request);
            if (actualContentType !== "application/json") {
              throw FinishRequest.statusErrorJson(415, "Unsupported Media Type", "unexpected request Content-Type");
            }
          }
          const result = await handler(request, response);
          if (result !== ALREADY_RESPONDED) {
            response.statusCode = 200;
            response.statusMessage = "OK";
            response.setHeader("Content-Type", "application/json");
            if (result === undefined) {
              response.write("{}");
            } else {
              response.write(JSON.stringify(result, null, 2));
            }
          }
        } catch (error) {
          let writeServerLog = true;
          if (error instanceof FinishRequest) {
            error.respond(response);
            if (response.statusCode < 500) {
              writeServerLog = false;
            }
          } else {
            response.statusCode = 500;
            response.statusMessage = "Internal Server Error";
          }
          if (writeServerLog) {
            console.error("uncaught exception", error, getErrorStackTraceAsString(error));
          }
        }
        response.end();
      })(),
    );
  };
}

/**
 * Returns the content type without any directives such as charset. We ignore the charset because Node gives us any
 * text/plain content as a string, with the charset already taken into consideration when decoding the request body
 * bytes to that string.
 */
function getContentTypeWithoutDirectives(request: LowLevelRequest): string {
  // types for express aren't really useful, unfortunately
  const contentType = ((request as any).get("Content-Type") as string) ?? "unknown";
  const semicolonIndex = contentType.indexOf(";");
  return semicolonIndex < 0 ? contentType : contentType.substring(0, semicolonIndex);
}
