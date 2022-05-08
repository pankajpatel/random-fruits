import styled from "styled-components";
import { PalletIdentifiers, Palette } from "../style/tokens/tokens";

export type BadgeType = PalletIdentifiers;

export const Badge = styled.span<{ type: BadgeType }>`
  padding: 0.25rem;
  border-radius: 0.25rem;
  background-color: ${(props) => Palette[props.type || 'info'].light};
  border: 1px solid rgba(0, 0 , 0, 0.05);
`;
