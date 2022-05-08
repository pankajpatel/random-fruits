import { render } from "@testing-library/react";
import { Table, TableCell } from "./Table";

type MockRow = {
  status: string;
  id: string;
  created: number;
  customer_name: string;
  amount: number;
  installmentsCount: number;
};

const mockConfig: TableCell<MockRow>[] = [
  {
    label: "Customer Name",
    key: "customer_name",
  },
  {
    label: "Created On",
    key: "created",
    render: (row: MockRow) => <>{new Date(row.created).toLocaleDateString()}</>,
  },
];

const mockRow = {
  status: "ready",
  id: "payment_i2NJhL",
  created: 1649023200000,
  customer_name: "Émile Zola",
  amount: 356050,
  installmentsCount: 10,
};

describe("Table", () => {
  it("should render without crashing", () => {
    const { container } = render(
      <Table cells={mockConfig} rows={[mockRow]} />
    );
    expect(container).toMatchSnapshot();
  });
});
