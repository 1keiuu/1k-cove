import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Text } from '../../shared/Typography';

const _List = styled.ul``;
const _ListItem = styled.li`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;
`;

const items = [
  {
    date: '2023.4',
    text: '株式会社サイバーエージェント入社',
  },
  {
    date: '2023.3',
    text: '慶應義塾大学経済学部卒業',
  },
  {
    date: '2022.3',
    text: '株式会社サイバーエージェント (内定者アルバイト)',
  },
  {
    date: '2021.7',
    text: '株式会社日本経済新聞社 (インターン)',
  },
  {
    date: '2021.3',
    text: '株式会社プレイド (インターン)',
  },
  {
    date: '2020.10',
    text: 'for Startups,Inc (インターン)',
  },
  {
    date: '2020.2',
    text: '株式会社Parchie (インターン)',
  },
  {
    date: '2019.2',
    text: '株式会社カイエン (インターン)',
  },
];

const CareerList = () => {
  return (
    <_List>
      {items.map((item, i) => {
        return (
          <_ListItem key={`career-item-${i}`}>
            <Text
              color={colors.text.black}
              style={{ marginRight: '8px' }}
              size={16}
            >
              {item.date}
            </Text>
            <Text color={colors.text.black} size={16}>
              {item.text}
            </Text>
          </_ListItem>
        );
      })}
    </_List>
  );
};
export default CareerList;
