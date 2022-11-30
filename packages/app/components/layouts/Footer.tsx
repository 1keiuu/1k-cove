import styled from 'styled-components';
import colors from '../../constants/colors';
import { Text } from '../shared/Typography';

const _Footer = styled.footer`
  display: flex;
  justify-content: center;
  background: ${colors.background.deep};
`;
const _FooterInner = styled.div`
  max-width: 910px;
  width: 100%;
`;
const _Upper = styled.div`
  display: flex;
  padding: 80px 24px 60px;
  border-bottom: 0.5px solid ${colors.border.grey};
`;
const _SNSSection = styled.div`
  margin-right: 60px;
`;
const _EmailSection = styled.div``;
const _Bottom = styled.div`
  padding: 30px 24px;
`;
const _List = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
`;
const _ListItem = styled.li`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  &:last-child {
    margin-right: 0;
  }
`;
const _Anchor = styled.a`
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 10px;
  background: ${colors.background.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const _Image = styled.img`
  object-fit: contain;
`;
const SNSLinkList = () => {
  return (
    <_List>
      <_ListItem>
        <_Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/1keiuu"
        >
          <_Image
            src="/icons/twitter.png"
            width={19}
            height={19}
            alt="twitter icon"
          ></_Image>
        </_Anchor>
      </_ListItem>
      <_ListItem>
        <_Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/1keiuu/?hl=ja"
        >
          <_Image
            src="/icons/ig.png"
            width={19}
            height={19}
            alt="instagram icon"
          ></_Image>
        </_Anchor>
      </_ListItem>
      <_ListItem>
        <_Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/1keiuu"
        >
          <_Image
            src="/icons/github.png"
            width={19}
            height={19}
            alt="github icon"
          ></_Image>
        </_Anchor>
      </_ListItem>
      <_ListItem>
        <_Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.wantedly.com/id/keiu"
        >
          <_Image
            src="/icons/wantedly.png"
            width={23}
            height={18}
            alt="wantedly icon"
          ></_Image>
        </_Anchor>
      </_ListItem>
    </_List>
  );
};

const Footer = () => {
  return (
    <_Footer>
      <_FooterInner>
        <_Upper>
          <_SNSSection>
            <Text size={20} color={colors.text.grey}>
              SNS
            </Text>
            <Text size={12} color={colors.text.greyLight}>
              副業のお誘いなどご気軽にご連絡ください。
            </Text>
            <SNSLinkList />
          </_SNSSection>
          <_EmailSection>
            <Text size={20} color={colors.text.grey}>
              Email
            </Text>
            <Text size={14} color={colors.text.greyLight}>
              <a
                href="mailto:ikkei12.inw@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ikkei12.inw@gmail.com
              </a>
            </Text>
          </_EmailSection>
        </_Upper>
        <_Bottom>
          <Text size={14} color="white">
            © Ikkei Harashima 2022
          </Text>
        </_Bottom>
      </_FooterInner>
    </_Footer>
  );
};

export default Footer;
