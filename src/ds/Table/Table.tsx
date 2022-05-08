import { ReactNode } from "react";
import styled from "styled-components";

export interface TableCell<T extends unknown> {
  label: string;
  key: keyof T;
  render?: (row: T) => ReactNode;
  align?: "left" | "right";
  sortable?: boolean;
}

interface TableProps<T> {
  rows: Array<T>;
  cells: TableCell<T>[];
  onRowClick?: (row: T) => void;
  onHeaderClick?: (key: keyof T) => void;
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

const HeaderCell = styled.th<{ align: "left" | "right", clickable: boolean }>`
  padding: 0.75rem;
  text-align: ${(props) => props.align ?? "left"};
  ${(props) => props.clickable && `
    cursor: pointer;
    &:hover { background-color: #eee; }
  `};
`;

const NOOP = () => {};

export const Table = <T extends unknown>({
  rows,
  cells,
  onRowClick = NOOP,
  onHeaderClick,
}: TableProps<T>): JSX.Element => (
  <StyledTable>
    <thead>
      <tr>
        {cells.map(({ label, align = "left", key, sortable }) => (
          <HeaderCell
            key={label}
            align={align}
            clickable={Boolean(sortable)}
            onClick={() => (sortable && onHeaderClick ? onHeaderClick : NOOP)(key)}
          >
            {label}
          </HeaderCell>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row: T, index: number) => (
        <Row
          key={index}
          onClick={() => onRowClick(row)}
          title="Click open Payment Details"
        >
          {cells.map(({ label, key, render, align = "left" }: TableCell<T>): ReactNode => {
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
                  <>{row[key]}</>
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
