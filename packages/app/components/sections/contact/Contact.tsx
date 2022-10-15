import styled from 'styled-components';
import { Title } from '../../shared/Typography';

const _Section = styled.div`
  padding: 160px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const _Title = styled(Title)`
  margin-bottom: 32px;
`;

const Contact = () => {
  return (
    <_Section id="contact">
      <_Title size={50}>Contact</_Title>
    </_Section>
  );
};
export default Contact;
