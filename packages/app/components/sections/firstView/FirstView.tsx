import styled from 'styled-components';
import { Title, Text } from '../../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10%;
  padding-right: 6%;
  @media screen and (max-width: 800px) {
    padding: 260px 8%;
  }
`;
const _LeftWrapper = styled.div`
  width: 60%;
  @media screen and (max-width: 800px) {
    width: unset;
  }
`;
const _RightWrapper = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const _TitleWrapper = styled.div`
  h2 {
    text-align: left;
  }
`;
const _Title = styled(Title)`
  text-align: center;
  margin-bottom: 8px;
  @media screen and (max-width: 1024px) {
    font-size: 50px;
  }
  @media screen and (max-width: 599px) {
    font-size: 40px;
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
