import styled from 'styled-components';

export const Spinner = styled.div.attrs((props) => ({}))`
  border: 2px solid transparent;
  border-left-color: #333;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  margin: 0.25rem;
  animation: keep-spinning 500ms infinite;
`;
