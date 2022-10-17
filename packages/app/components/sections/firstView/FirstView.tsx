import styled from 'styled-components';
import { Title, Text } from '../../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 599px) {
    padding: 0 16px;
  }
`;
const _Title = styled(Title)`
  text-align: center;
  margin-bottom: 8px;
  @media screen and (max-width: 599px) {
    font-size: 50px;
  }
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
