import styled from 'styled-components';
import { Title } from '../../shared/Typography';
import LinkList from './LinkList';

const _Section = styled.div`
  padding: 160px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
