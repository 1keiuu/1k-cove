import styled from 'styled-components';
import { Title, Text } from '../../shared/Typography';

const _Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 260px;
  padding-right: 200px;
  height: 100vh;
  @media screen and (max-width: 1024px) {
    padding: 0 20vw 160px;
  }
  @media screen and (max-width: 599px) {
    padding: 0 46px 160px;
  }
`;
const _Title = styled(Title)`
  margin-bottom: 32px;
`;
const _ImgWrapper = styled.div`
  width: 30%;
`;
const _Inner = styled.div`
  margin-bottom: 56px;
  width: 40%;
  @media screen and (max-width: 599px) {
    width: 100%;
  }
`;
const _Text = styled(Text)`
  line-height: 2.5;
`;

const Career = () => {
  return (
    <_Section id="career">
      <_ImgWrapper>
        <img src="/top/1.jpg" width="300" />
      </_ImgWrapper>
      <_Inner>
        <_Title size={50}>CAREER</_Title>
        <_Text size={16}>
          都内在住のwebフロントエンドエンジニア。
          <br />
          学生時代にwebに出会い、独学で勉強を開始。
          <br />
          複数社でインターンを経験した後に2022年より株式会社サイバーエージェントにて内定者アルバイトとしてコードを書いています。
          <br />
          副業のスタートアップではフロントエンドに加えてバックエンドを書くこともあります。
        </_Text>
      </_Inner>
    </_Section>
  );
};
export default Career;
