import styled from 'styled-components';
import { useRoute } from 'wouter';
import { ContainerWithGutter } from '@app/ds/Container';
import { Code } from '@app/ds/Code';
import { Pallette } from '@app/style/tokens';

const CenteredContainer = styled(ContainerWithGutter)`
  text-align: center;
`;

const H1 = styled.h1`
  margin: 5rem 0 2rem;
  font-size: 15rem;
  font-weight: bold;
  color: #aaa;
`;

const Link = styled.a`
  color: ${Pallette.success.dark};
  margin: 1rem;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${Pallette.success.light};
  padding: 0.5rem 0.75rem;
  display: inline-block;
  border-radius: 0.5rem;
  border: 1px solid ${Pallette.success.dark};
`;

export const Page404 = () => {
  const [, params] = useRoute('/:rest*');
  return (
    <CenteredContainer>
      <H1>404</H1>
      Sorry the page <Code>{params?.rest ?? ''}</Code> does not exist!
      <div>
        <Link href="/">Go to the home page</Link>
      </div>
    </CenteredContainer>
  );
};
