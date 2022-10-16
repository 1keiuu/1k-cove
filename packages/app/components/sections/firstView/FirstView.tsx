import styled from 'styled-components';
import { Title, Text } from '../../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const _Title = styled(Title)`
  text-align: center;
  margin-bottom: 8px;
`;

const FirstView = () => {
  return (
    <_Section id="top">
      <_Title>“Hi. I’m Ikkei Harashima.“</_Title>
      <Text>Web Frontend Engineer</Text>
    </_Section>
  );
};
export default FirstView;
