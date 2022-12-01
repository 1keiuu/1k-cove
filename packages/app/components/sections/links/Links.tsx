import styled from 'styled-components';
import { Title } from '../../shared/Typography';
import LinkList from './LinkList';

const _Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 260px 6% 260px 10%;
  @media screen and (max-width: 800px) {
    padding: 260px 8%;
  }
`;
const _Title = styled(Title)`
  margin-bottom: 32px;
`;

const _ContentWrapper = styled.div`
  margin-right: 100px;
  @media screen and (max-width: 800px) {
    margin-right: 0;
  }
`;

const _ImageWrapper = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

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
