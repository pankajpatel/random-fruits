import styled from 'styled-components';
import { PalletIdentifiers, Palette } from '../style/tokens/tokens';

export type BadgeType = PalletIdentifiers;

export const Badge = styled.span<{ type: BadgeType }>`
  padding: 0.35em 0.55em;
  border-radius: 0.4em;
  background-color: ${(props) => Palette[props.type || 'info'].light};
  border: 1px solid rgba(0, 0, 0, 0.05);
  line-height: 1;
`;
