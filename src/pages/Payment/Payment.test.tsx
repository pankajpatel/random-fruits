import { render } from "@testing-library/react";
import { Payment } from "./Payment";

import { mockEndpoint, MockableHTTPMethods } from "../../testing/api-mocks";
import { withProviders } from "../../testing/provider-setup";

import mockPaymentJSON from "../../fixtures/payment.json";

const mockPayment = {
  id: "payment_i2NJhL",
};

describe("Payment", () => {
  beforeAll(() => {
    mockEndpoint({
      url: "/payments/*",
      response: mockPaymentJSON,
      status: 200,
      method: MockableHTTPMethods.GET,
    });
  });
  it("should render without crashing", () => {
    const { container } = render(
      withProviders(<Payment id={mockPayment.id} />)
    );
    expect(container).toMatchSnapshot();
  });
});
