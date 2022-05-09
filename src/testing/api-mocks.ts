import {
  rest,
  ResponseFunction,
  RestContext,
  RESTMethods,
  RestRequest,
} from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from '@app/api';

import paymentsJSON from '@app/fixtures/payments.json';

type Value = unknown;

type Response = Record<string, Value> | Array<Record<string, Value>>;

type RequestMockConfig = {
  baseUrl?: string;
  url: string;
  response: Response;
  method?: RESTMethods;
  status?: number;
  delayInMs?: number;
};

/* Could be better than 1:1 mapping; would improve if I have time */
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

export const server = setupServer(
  rest.get('/', (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
    return res(ctx.delay(0), ctx.status(200), ctx.json({}));
  })
);

export { RESTMethods as MockableHTTPMethods };

export const mockEndpoint = ({
  url,
  response = {},
  baseUrl = BASE_URL,
  method = RESTMethods.GET,
  status = 200,
  delayInMs = 0,
}: RequestMockConfig) => {
  const handler = getMethod(method)(
    `${baseUrl}${url}`,
    (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
      return res(ctx.delay(delayInMs), ctx.status(status), ctx.json(response));
    }
  );
  server.use(handler);
};

export const resetAPIMocks = () => {
  server.resetHandlers();
};

mockEndpoint({
  url: '/payments',
  response: paymentsJSON,
});
