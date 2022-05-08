import styled from "styled-components";

type RowObject = Record<string, any>;

export interface TableCell {
  label: string;
  key: string;
  render?: (row: any) => JSX.Element;
  align?: "left" | "right";
  sortable?: boolean;
}

interface TableProps {
  rows: Array<RowObject>;
  cells: TableCell[];
  onRowClick?: (row: RowObject) => void;
  onHeaderClick?: (key: string) => void;
}

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const Row = styled.tr`
  cursor: pointer;
  font-size: 1.1rem;

  &:nth-child(even) {
    background-color: #fafafa;
  }

  &:hover {
    background-color: #eee;
  }
`;

const Cell = styled.td<{ align: "left" | "right" }>`
  padding: 0.5rem 0.75rem;
  text-align: ${(props) => props.align ?? "left"};
`;

const HeaderCell = styled.th<{ align: "left" | "right" }>`
  padding: 0.75rem;
  text-align: ${(props) => props.align ?? "left"};
`;

export const Table = ({
  rows,
  cells,
  onRowClick = () => {},
  onHeaderClick = () => {},
}: TableProps): JSX.Element => {

  return (
    <StyledTable>
      <thead>
        <tr>
          {cells.map(({ label, align = "left", key }) => (
            <HeaderCell align={align} key={label} onClick={() => onHeaderClick(key)}>
              {label}
            </HeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row: RowObject) => (
          <Row onClick={() => onRowClick(row)} key={row.id} title="Click open Payment Details">
            {cells.map(({ label, key, render, align = "left" }: TableCell) => {
              if (typeof render === "function") {
                return (
                  <Cell align={align} key={label}>
                    {render(row)}
                  </Cell>
                );
              }
              if (key) {
                return (
                  <Cell align={align} key={label}>
                    {row[key]}
                  </Cell>
                );
              }
              return (
                <Cell align={align} key={label}>
                  ' '
                </Cell>
              );
            })}
          </Row>
        ))}
      </tbody>
    </StyledTable>
  );
};
