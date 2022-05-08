import { render } from "@testing-library/react";
import { Table } from "./Table";

const mockConfig = [
  {
    label: "Customer Name",
    key: "customer_name",
  },
  {
    label: "Created On",
    key: "created",
    render: (row: any) => <>{new Date(row.created).toLocaleDateString()}</>,
  },
];

const mockRow = {
  status: "ready",
  id: "payment_i2NJhL",
  created: 1649023200000,
  customer_name: "Émile Zola",
  merchant: {
    name: "Super Merchant",
  },
  amount: 356050,
  installmentsCount: 10,
};

describe("Table", () => {
  it("should render without crashing", () => {
    const { container } = render(<Table cells={mockConfig} rows={[mockRow]} />);
    expect(container).toMatchSnapshot();
  });
});
