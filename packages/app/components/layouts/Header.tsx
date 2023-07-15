import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Text } from "../shared/Typography";

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
  opacity: ${(props) => (props.isShow ? 1 : 0)};
  pointer-events: ${(props) => (props.isShow ? "unset" : "none")};
  transition: all 0.4s ease;
  background: transparent;
  @media screen and (max-width: 599px) {
    padding: 8px;
  }
`;
const _Nav = styled.nav`
  width: 100%;
`;
const _AnchorList = styled.ul`
  display: flex;
  padding: 0;
  justify-content: flex-end;
  @media screen and (max-width: 599px) {
    justify-content: space-between;
    padding: 0 32px;
  }
`;
const _AnchorListItem = styled.li`
  list-style: none;
  height: 46px;
`;
const _OuterLinkListItemIcon = styled(_AnchorListItem)`
  margin-left: 24px;
`;
const _Anchor = styled.a`
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
  padding: 8px 32px;
  @media screen and (max-width: 599px) {
    padding: 8px;
  }
`;
const _IconAnchor = styled.a`
  width: 50px;
  height: 46px;
  padding: 8px;
  border-radius: 10px;
  background: ${colors.background.deep};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const _Image = styled.img`
  object-fit: contain;
`;

type HeaderProps = {
  handleItemClick: (selector?: string) => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const [isShow, setIsShow] = useState(true);

  const onScroll = () => {
    const offset = window.pageYOffset;
    if (offset > 200) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  const items = [
    {
      name: "about",
      selector: "#about",
      text: "About",
    },
    {
      name: "links",
      selector: "#links",
      text: "Links",
    },
    {
      name: "blog",
      text: "Blog",
    },
    {
      name: "github",
      text: "",
    },
  ];
  return (
    <_Header isShow={isShow}>
      <_Nav>
        <_AnchorList>
          {items.map((item, i) => {
            if (item.name === "blog") {
              return (
                <_AnchorListItem key={`item-${i}`}>
                  <_Anchor
                    href="https://blog.1keiuu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text size={15} weight="bold">
                      {item.text}
                    </Text>
                  </_Anchor>
                </_AnchorListItem>
              );
            }
            if (item.name === "github") {
              return (
                <_OuterLinkListItemIcon key={`item-${i}`}>
                  <_IconAnchor
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/1keiuu"
                  >
                    <_Image
                      src="/icons/github.png"
                      width={24}
                      height={24}
                      alt="github icon"
                    ></_Image>
                  </_IconAnchor>
                </_OuterLinkListItemIcon>
              );
            }
            return (
              <_AnchorListItem key={`item-${i}`}>
                <_Anchor
                  onClick={() => {
                    props.handleItemClick(item.selector);
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
