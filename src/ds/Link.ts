import { PalletteIdentifiers, Pallette } from '@app/style/tokens';
import styled from 'styled-components';

export const Link = styled.a`
  font-size: 1rem;
  display: inline-block;
`;

export const LinkButton = styled.a<{ color: PalletteIdentifiers }>`
  ${({ color }) => `
    color: ${Pallette[color].dark};
    background-color: ${Pallette[color].light};
    border: 1px solid ${Pallette[color].dark};
  `};
  margin: 1rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  display: inline-block;
  border-radius: 0.5rem;
`;
