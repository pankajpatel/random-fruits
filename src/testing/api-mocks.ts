import {
  rest,
  ResponseFunction,
  RestContext,
  RESTMethods,
  RestRequest,
} from "msw";
import { setupServer } from "msw/node";
import { BASE_URL } from "../api";

import paymentsJSON from "../fixtures/payments.json";

type Value = any;

type Response =
  | Record<string, Value>
  | Array<Record<string, Value>>;

type RequestMockConfig = {
  baseUrl?: string;
  url: string;
  method: RESTMethods;
  status: number;
  response: Response;
  delayInMs?: number;
};

const server = setupServer();

const getMethod = (method: RESTMethods) => {
  switch (method) {
    case RESTMethods.GET:
      return rest.get;
    case RESTMethods.POST:
      return rest.post;
    case RESTMethods.PUT:
      return rest.put;
    case RESTMethods.DELETE:
      return rest.delete;
    case RESTMethods.PATCH:
      return rest.patch;
    case RESTMethods.HEAD:
      return rest.head;
    case RESTMethods.OPTIONS:
      return rest.options;
    default:
      return rest.all;
  }
};

export { RESTMethods as MockableHTTPMethods };

export const mockEndpoint = (config: RequestMockConfig) => {
  server.use(
    getMethod(config.method)(
      `${config.baseUrl ?? BASE_URL}${config.url}`,
      (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
        return res(ctx.status(config.status), ctx.json(config.response));
      }
    )
  );
};

mockEndpoint({
  method: RESTMethods.GET,
  url: "/payments",
  status: 200,
  response: paymentsJSON,
  delayInMs: 200,
});

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
