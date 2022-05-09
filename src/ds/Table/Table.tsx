import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface TableCell<T extends unknown> {
  label: ReactNode;
  key: keyof T;
  render?: (row: T) => ReactNode;
  align?: 'left' | 'right';
  sortable?: boolean;
  maxWidth?: string;
}

interface TableProps<T> {
  rows: Array<T>;
  cells: TableCell<T>[];
  onRowClick?: (row: T) => void;
  onHeaderClick?: (key: keyof T) => void;
  noResultsMessage?: ReactNode;
}

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
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

interface AlignmentProps {
  align: 'left' | 'right';
}

const defaultCellCss = css<AlignmentProps>`
  padding: 0.75rem 0.5rem;
  text-align: ${(props) => props.align ?? 'left'};
`;

const Cell = styled.td<AlignmentProps & { maxWidth?: string }>`
  ${defaultCellCss}
`;

const HeaderCell = styled.th<AlignmentProps & { clickable: boolean }>`
  ${defaultCellCss}
  background-color: #eee;
  ${(props) =>
    props.clickable &&
    `
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
    &:hover {
      background-color: #ddd;
    }
  `};
`;

const NOOP = () => {};

export const Table = <T extends unknown>({
  rows,
  cells,
  onRowClick = NOOP,
  onHeaderClick,
  noResultsMessage = null,
}: TableProps<T>): JSX.Element => (
  <StyledTable>
    {Boolean(rows.length && noResultsMessage) && (
      <thead>
        <tr>
          {cells.map(({ label, align = 'left', key, sortable }) => (
            <HeaderCell
              key={key as string}
              align={align}
              clickable={Boolean(sortable)}
              onClick={() =>
                (sortable && onHeaderClick ? onHeaderClick : NOOP)(key)
              }
            >
              {label}
              {sortable && <small>⇵</small>}
            </HeaderCell>
          ))}
        </tr>
      </thead>
    )}
    <tbody>
      {rows.map((row: T, index: number) => (
        <Row
          key={index}
          onClick={() => onRowClick(row)}
          title="Click to open payment details"
        >
          {cells.map(
            ({
              label,
              key,
              render,
              align = 'left',
              maxWidth,
            }: TableCell<T>): ReactNode => {
              const cellKey = key as string;
              if (typeof render === 'function') {
                return (
                  <Cell align={align} key={cellKey} maxWidth={maxWidth}>
                    {render(row)}
                  </Cell>
                );
              }
              if (key) {
                return (
                  <Cell align={align} key={cellKey} maxWidth={maxWidth}>
                    <>{row[key]}</>
                  </Cell>
                );
              }
              return <Cell align={align} key={cellKey} />;
            }
          )}
        </Row>
      ))}
      {rows.length === 0 && noResultsMessage && (
        <tr>
          <td colSpan={cells.length}>{noResultsMessage}</td>
        </tr>
      )}
    </tbody>
  </StyledTable>
);
