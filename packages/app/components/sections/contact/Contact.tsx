import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Title, Text } from '../../shared/Typography';
import ContactList from './ContactList';

const _Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 25vw 240px;
  @media screen and (max-width: 1024px) {
    padding: 0 20vw 160px;
  }
  @media screen and (max-width: 599px) {
    padding: 0 46px 160px;
  }
`;
const _Title = styled(Title)`
  margin-bottom: 56px;
`;
const _Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const _ContactListWrapper = styled.div``;
const _EmailAnchor = styled.a`
  border-bottom: 1px solid ${colors.text.primary};
  padding-bottom: 1px;
`;

const Contact = () => {
  return (
    <_Section id="contact">
      <_Title size={50} color={colors.text.black}>
        CONTACT
      </_Title>

      <_Inner>
        副業のお誘いなどご気軽にご連絡ください。
        <_ContactListWrapper>
          <ContactList></ContactList>
        </_ContactListWrapper>
      </_Inner>
    </_Section>
  );
};
export default Contact;
