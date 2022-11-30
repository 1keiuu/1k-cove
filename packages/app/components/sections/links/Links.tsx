import styled from 'styled-components';
import { Title } from '../../shared/Typography';
import LinkList from './LinkList';

const _Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25vw 260px;
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

const _ContentWrapper = styled.div``;

const _ImageWrapper = styled.div``;

const Links = () => {
  return (
    <_Section id="links">
      <_ContentWrapper>
        <_Title size={50}>LINKS</_Title>
        <LinkList></LinkList>
      </_ContentWrapper>
      <_ImageWrapper>
        <img src="/top/1.jpg" width="300" />
      </_ImageWrapper>
    </_Section>
  );
};
export default Links;
