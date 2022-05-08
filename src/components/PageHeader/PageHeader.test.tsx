import { render } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("should render without crashing", () => {
    const { container } = render(<PageHeader>Test</PageHeader>);
    expect(container).toMatchSnapshot();
  })
});
