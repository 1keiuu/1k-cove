import styled from 'styled-components';
import { Title } from '../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Career = () => {
  return (
    <_Section id="career">
      <Title>“Career“</Title>
    </_Section>
  );
};
export default Career;
