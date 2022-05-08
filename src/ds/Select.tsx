import styled from "styled-components";

const SelectWrapper = styled.div``;

const StyledSelect = styled.select`
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
`;

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  value?: string;
}

export const Select = ({ children, ...props }: Props): JSX.Element => (
  <SelectWrapper>
    <StyledSelect {...props}>{children}</StyledSelect>
  </SelectWrapper>
);
