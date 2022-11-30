import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Title, Text } from '../../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 200px;
  padding-right: 120px;

  @media screen and (max-width: 599px) {
    padding: 0 16px;
  }
`;
const _LeftWrapper = styled.div`
  width: 60%;
`;
const _RightWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const _TitleWrapper = styled.div`
  h2 {
    text-align: left;
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
      <_LeftWrapper>
        <_TitleWrapper>
          <_Title>WEB FRONTEND</_Title>
          <_Title>DEVELOPER</_Title>
        </_TitleWrapper>
        <Text size={40} weight="normal">
          Ikkei Harashima
        </Text>
      </_LeftWrapper>
      <_RightWrapper>
        <img src="/top/1.jpg" width="300" height="522" alt="top image" />
      </_RightWrapper>
    </_Section>
  );
};
export default FirstView;
