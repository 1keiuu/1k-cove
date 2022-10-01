import { useEffect, useState } from 'react';
import styled from 'styled-components';

const _Header = styled.header<{ isShow: boolean }>`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 3;
  display: flex;
  justify-content: flex-end;
  top: ${(props) => (props.isShow ? 0 : '-60px')};
  transition: all 0.4s ease;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
`;
const _AnchorList = styled('ul')({
  display: 'flex',
});
const _AnchorListItem = styled('li')({
  listStyle: 'none',
  marginRight: '16px',
});
const _Anchor = styled('a')({
  cursor: 'pointer',
});

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
  return (
    <_Header isShow={isShow}>
      <nav>
        <_AnchorList>
          <_AnchorListItem>
            <_Anchor
              onClick={() => {
                props.handleItemClick(2, '#about');
              }}
            >
              ABOUT
            </_Anchor>
          </_AnchorListItem>
          <_AnchorListItem>
            <_Anchor
              onClick={() => {
                props.handleItemClick(3, '#career');
              }}
            >
              CAREER
            </_Anchor>
          </_AnchorListItem>
        </_AnchorList>
      </nav>
    </_Header>
  );
};
export default Header;
