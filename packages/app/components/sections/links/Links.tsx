import styled from 'styled-components';
import { Title } from '../../shared/Typography';
import LinkList from './LinkList';

const _Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 260px 120px 260px 200px;
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

const _ContentWrapper = styled.div`
  margin-right: 100px;
`;

const _ImageWrapper = styled.div``;

const Links = () => {
  return (
    <_Section id="links">
      <_ContentWrapper>
        <_Title size={50} weight="normal">
          Links
        </_Title>
        <LinkList></LinkList>
      </_ContentWrapper>
      <_ImageWrapper>
        <img src="/top/3.jpg" width={311} height={454} alt="top image" />
      </_ImageWrapper>
    </_Section>
  );
};
export default Links;
