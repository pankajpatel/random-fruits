import styled from 'styled-components';
import { Input } from '@app/ds/Input';

const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const FilterBar = ({
  onChange,
}: {
  onChange: (val: string) => void;
}) => (
  <FilterBarContainer>
    <Input
      type="text"
      placeholder="Filter Payments"
      onChange={(e) => onChange(e.target.value)}
    />
  </FilterBarContainer>
);
