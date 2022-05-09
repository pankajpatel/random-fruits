import { FormattedNumber } from 'react-intl';

export const Amount = ({ value }: { value: number }) => (
  <>
    <FormattedNumber value={value} minimumFractionDigits={2} /> €
  </>
);
