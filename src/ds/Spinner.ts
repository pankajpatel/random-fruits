import styled from 'styled-components';

export const Spinner = styled.div.attrs(
  (props: { 'data-testid'?: string; title?: string }) => ({
    title: props.title || 'Loading...',
    'data-testid': props['data-testid'] || 'spinner',
  })
)`
  border: 2px solid transparent;
  border-left-color: #333;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  margin: 0.25rem;
  animation: keep-spinning 500ms infinite;
`;
