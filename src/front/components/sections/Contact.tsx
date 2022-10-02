import styled from 'styled-components';
import { Title } from '../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contact = () => {
  return (
    <_Section id="contact">
      <Title>“Contact“</Title>
    </_Section>
  );
};
export default Contact;
