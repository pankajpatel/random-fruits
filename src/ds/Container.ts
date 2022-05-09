import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 960px;
  margin: 0 auto;
`;

const gutterCss = css`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const ContainerWithGutter = styled(Container)`
  ${gutterCss}
`;

export const ContainerOnlyWithGutter = styled.div`
  ${gutterCss}
`;
