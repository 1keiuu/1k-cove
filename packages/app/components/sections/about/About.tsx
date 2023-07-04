import styled from "styled-components";
import { Title, Text } from "../../shared/Typography";

const _Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding-left: 10%;
  padding-right: 6%;
  @media screen and (max-width: 800px) {
    padding: 0 8%;
    justify-content: center;
  }
`;
const _Title = styled(Title)`
  margin-bottom: 32px;
`;
const _ImgWrapper = styled.div`
  width: 30%;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const _Inner = styled.div`
  margin-bottom: 56px;
  margin-left: 200px;
  @media screen and (max-width: 800px) {
    margin-left: 0;
  }
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;
const _Text = styled(Text)`
  line-height: 2.5;
`;

const About = () => {
  return (
    <_Section id="about">
      <_ImgWrapper>
        <img src="/top/2.jpg" width={341} height={672} alt="top image" />
      </_ImgWrapper>
      <_Inner>
        <_Title size={50} weight="normal">
          About
        </_Title>
        <_Text size={16}>
          都内在住のwebエンジニア。
          <br />
          学生時代にwebに出会い、独学で勉強を開始。複数社でインターンを経験。
          <br />
          2022年3月より株式会社サイバーエージェントに入社。
          <br />
          webフロントがメイン領域ですが、副業等でバックエンドを書くこともあります。
        </_Text>
      </_Inner>
    </_Section>
  );
};
export default About;
