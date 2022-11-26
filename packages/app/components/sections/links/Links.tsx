import styled from 'styled-components';
import { Title } from '../../shared/Typography';
import LinkList from './LinkList';

const _Section = styled.div`
  display: flex;
  flex-direction: column;
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

const Links = () => {
  return (
    <_Section id="links">
      <_Title size={50}>Links</_Title>
      <LinkList></LinkList>
    </_Section>
  );
};
export default Links;
