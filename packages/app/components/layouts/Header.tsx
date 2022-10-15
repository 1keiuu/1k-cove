import { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import { Text } from '../shared/Typography';

const _Header = styled.header<{ isShow: boolean }>`
  position: fixed;
  width: 100vw;
  height: 80px;
  padding-top: 32px;
  padding-right: 56px;
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: ${(props) => (props.isShow ? 0 : '-80px')};
  transition: all 0.4s ease;
  background: transparent;
`;
const _Nav = styled.nav``;
const _AnchorList = styled.ul`
  display: flex;
  padding: 0;
`;
const _AnchorListItem = styled.li`
  list-style: none;
`;
const _Anchor = styled.a`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 32px;
`;
const _OuterLinkListItem = styled(_AnchorListItem)`
  border-radius: 30px;
  background: ${colors.text.primary};
  padding: 0;
  margin-left: 16px;
`;
const _OuterLink = styled(_Anchor)`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 56px;
`;
type HeaderProps = {
  handleItemClick: (sectionIndex: number, selector: string) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const onScroll = () => {
    const offset = window.pageYOffset;

    if (offset > 120) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
  const items = [
    {
      index: 1,
      selector: '#top',
      text: 'Top',
    },
    {
      index: 2,
      selector: '#career',
      text: 'Career',
    },
    {
      index: 3,
      selector: '#links',
      text: 'Links',
    },
    {
      index: 4,
      selector: '#contact',
      text: 'Contact',
    },
    {
      index: null,
      text: 'Blog',
    },
  ];
  return (
    <_Header isShow={isShow}>
      <_Nav>
        <_AnchorList>
          {items.map((item, i) => {
            if (item.index === null) {
              return (
                <_OuterLinkListItem key={`item-${i}`}>
                  <_OuterLink
                    href="https://1k-cove.com/articles"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text size={15} weight="bold" color="white">
                      {item.text}
                    </Text>
                  </_OuterLink>
                </_OuterLinkListItem>
              );
            }
            return (
              <_AnchorListItem key={`item-${i}`}>
                <_Anchor
                  onClick={() => {
                    props.handleItemClick(item.index, item.selector);
                  }}
                >
                  <Text size={15} weight="bold">
                    {item.text}
                  </Text>
                </_Anchor>
              </_AnchorListItem>
            );
          })}
        </_AnchorList>
      </_Nav>
    </_Header>
  );
};
export default Header;
