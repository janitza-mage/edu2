import { LowLevelResponse } from "./LowLevel";

export type Responder = (response: LowLevelResponse) => void;

export class FinishRequest extends Error {
  respond: Responder;

  constructor(respond: Responder) {
    super("finish request");
    this.respond = respond;
  }

  // ------------------------------------------------------------------------------------------------------------------
  // special-purpose response exceptions
  // ------------------------------------------------------------------------------------------------------------------

  static alreadyResponded(): FinishRequest {
    return new FinishRequest(() => undefined);
  }

  // ------------------------------------------------------------------------------------------------------------------
  // generic response exceptions
  // ------------------------------------------------------------------------------------------------------------------

  static statusEmpty(statusCode: number, statusMessage: string): FinishRequest {
    return new FinishRequest((response) => {
      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
    });
  }

  static statusText(statusCode: number, statusMessage: string, text: string): FinishRequest {
    return new FinishRequest((response) => {
      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
      response.setHeader("Content-Type", "text/plain");
      response.write(text);
    });
  }

  static statusJson(statusCode: number, statusMessage: string, data: unknown): FinishRequest {
    return new FinishRequest((response) => {
      response.statusCode = statusCode;
      response.statusMessage = statusMessage;
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(data, null, 2));
    });
  }

  static statusErrorJson(
    statusCode: number,
    statusMessage: string,
    error: string,
    extraFields?: Record<string, unknown> | undefined | null,
  ): FinishRequest {
    const body = { error: `${error}`, ...(extraFields ?? {}) }; // make sure "error" is a string
    return FinishRequest.statusJson(statusCode, statusMessage, body);
  }

  // ------------------------------------------------------------------------------------------------------------------
  // response exceptions for specific cases
  // ------------------------------------------------------------------------------------------------------------------

  static authenticationFailed(): FinishRequest {
    // Yes, "unauthorized" for failed authentication. HTTP is like that.
    return FinishRequest.statusEmpty(401, "Unauthorized");
  }

  /**
   * This function can be called instead of notFound() when authorization has not yet succeeded and we don't
   * want to reveal to the caller whether authorization fails or a record is missing, so we don't expose the
   * existence of records that belong to other users.
   *
   * See https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
   */
  static authorizationFailed(): FinishRequest {
    return FinishRequest.statusEmpty(403, "Forbidden");
  }

  static notFound(error?: string | undefined | null): FinishRequest {
    return FinishRequest.statusErrorJson(404, "Not Found", error ?? "not found");
  }

  static badRequest(
    error?: string | undefined | null,
    extraFields?: Record<string, unknown> | undefined | null,
  ): FinishRequest {
    return FinishRequest.statusErrorJson(400, "Bad Request", error ?? "bad request", extraFields);
  }

  static internalError(): FinishRequest {
    return FinishRequest.statusEmpty(500, "Internal Server Error");
  }

  static okayJson(data: unknown): FinishRequest {
    return FinishRequest.statusJson(200, "OK", data);
  }
}
