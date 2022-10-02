import styled from 'styled-components';
import { Title, Text } from '../shared/Typography';

const _Section = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const _AnchorListItem = styled.li``;
// const _Anchor = styled.a`
//   cursor: pointer;
// `;

const FirstView = () => {
  return (
    <_Section id="top">
      <Title>“Hi. I’m Ikkei Harashima.“</Title>
      <Text>Web Frontend Engineer</Text>
      {/* <_AnchorList>
        <_AnchorListItem>
          <_Anchor
            onClick={() => {
              scrollTo(2, '#about');
            }}
          >
            ABOUT
          </_Anchor>
        </_AnchorListItem>
        <_AnchorListItem>
          <_Anchor
            onClick={() => {
              scrollTo(3, '#career');
            }}
          >
            CAREER
          </_Anchor>
        </_AnchorListItem>
      </_AnchorList> */}
    </_Section>
  );
};
export default FirstView;
