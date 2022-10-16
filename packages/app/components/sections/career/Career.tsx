import styled from 'styled-components';
import { Title, Text } from '../../shared/Typography';
import CareerList from './CareerList';

const _Section = styled.div`
  padding-bottom: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const _Title = styled(Title)`
  margin-bottom: 32px;
`;
const _Inner = styled.div`
  margin-bottom: 56px;
  width: 40vw;
`;
const _Text = styled(Text)`
  line-height: 2.5;
`;

const Career = () => {
  return (
    <_Section id="career">
      <_Title size={50}>Career</_Title>
      <_Inner>
        <_Text size={16}>
          都内在住のwebフロントエンドエンジニア。学生時代にwebに出会い、独学で勉強を開始。
          複数社でインターンを経験した後に2022年より株式会社サイバーエージェントにて内定者アルバイトとしてコードを書いています。
          副業のスタートアップではフロントエンドに加えてバックエンドを書くこともあります。
        </_Text>
      </_Inner>
      <CareerList></CareerList>
    </_Section>
  );
};
export default Career;
