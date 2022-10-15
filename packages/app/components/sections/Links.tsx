import styled from 'styled-components';
import { Title } from '../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Links = () => {
  return (
    <_Section id="links">
      <Title>“Links“</Title>
    </_Section>
  );
};
export default Links;
