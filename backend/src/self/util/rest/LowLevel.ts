import { IncomingMessage, ServerResponse } from "http";

export type LowLevelRequest = IncomingMessage & {
  params: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
};
export type LowLevelResponse = ServerResponse & { json: (data: any) => void };
export type ExpressHandlerStarter = (request: LowLevelRequest, response: LowLevelResponse) => void;
