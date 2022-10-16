import styled from 'styled-components';
import colors from '../../../constants/colors';

const _List = styled.ul`
  display: flex;
  justify-content: center;
  padding: 56px;
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
  width: 50px;
  height: 50px;
  padding: 8px;
  border-radius: 50%;
  background: ${colors.background.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const _Image = styled.img`
  object-fit: contain;
`;

const ContactList = () => {
  return (
    <_List>
      <_ListItem>
        <_Anchor
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/1keiuu"
        >
          <_Image
            src="/twitter.png"
            width={24}
            height={24}
            alt="twitter icon"
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
            src="/github.png"
            width={24}
            height={24}
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
            src="/wantedly.png"
            width={35}
            height={35}
            alt="wantedly icon"
          ></_Image>
        </_Anchor>
      </_ListItem>
    </_List>
  );
};
export default ContactList;
