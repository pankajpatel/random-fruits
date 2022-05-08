import { render } from "@testing-library/react";
import { Payments } from './Payments';

import { withProviders } from "@app/testing/provider-setup";

describe('Payments', () => {
  it('should render when no transaction is present', () => {
    const { container } = render(withProviders(<Payments />));
    expect(container).toMatchSnapshot();
  })

  it('should render when transactions are present', () => {
    const { container } = render(withProviders(<Payments />));
    expect(container).toMatchSnapshot();
  })
})
