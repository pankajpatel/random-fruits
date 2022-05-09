import styled from 'styled-components';
import { PalletteIdentifiers, Pallette } from '../style/tokens/tokens';

export type BadgeType = PalletteIdentifiers;

export const Badge = styled.span<{ type: BadgeType }>`
  padding: 0.35em 0.55em;
  border-radius: 0.4em;
  background-color: ${(props) => Pallette[props.type || 'info'].light};
  border: 1px solid rgba(0, 0, 0, 0.05);
  line-height: 1;
`;
