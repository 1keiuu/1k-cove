import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Text } from '../../shared/Typography';

const _List = styled.ul`
  padding: 0;
`;
const _SubTitle = styled(Text)`
  margin-bottom: 8px;
`;
const _ListItem = styled.li`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 32px;
  margin-bottom: 16px;
`;
const _Anchor = styled.a`
  text-decoration: underline;
`;

const qiitaLinks = [
  {
    date: '2020.11',
    url: 'https://qiita.com/ikkei12/items/cba90ac057e8f0a9c2c5',
    text: '【Electron入門】GithubのIssueを一瞬で確認できるアプリを作って業務効率化してみた #1 Alfredっぽいwindow作成編',
  },
  {
    date: '2020.12',
    url: 'https://qiita.com/ikkei12/items/0f0c2d95bdd3b54d6bac',
    text: 'NuxtアプリをSSGでビルドしてCI/CDをお手軽に設定する【GitHub Actions × Firebase Hosting】',
  },
];
const wantedlyLinks = [
  {
    date: '2021.1',
    url: 'https://www.wantedly.com/companies/forstartups/post_articles/304328',
    text: '【フォースタ テックブログ】フォースタートアップスでWebエンジニアインターンで働くということ',
  },
];
const noteLinks = [
  {
    date: '2020.11',
    url: 'https://note.com/1keiu/n/n95a20ee12d54',
    text: '学生エンジニアが初めてハッカソンに参加してみたら学びが多かった話',
  },
];

type LinkItem = { date: string; url: string; text: string };
type LinkItemProps = { title: string; items: LinkItem[] };

const LinkListItemGroup: React.FC<LinkItemProps> = (props) => {
  const _LinkListItemGroupInner = styled.div`
    margin-bottom: 32px;
  `;
  return (
    <_LinkListItemGroupInner>
      <_SubTitle>{props.title}</_SubTitle>
      {props.items.map((item, i) => {
        return (
          <_ListItem key={`career-item-${i}`}>
            <Text
              color={colors.text.black}
              style={{ marginRight: '8px' }}
              size={16}
            >
              {item.date}
            </Text>
            <_Anchor href={item.url} target="_blank" rel="noopener noreferrer">
              <Text color={colors.text.black} size={16}>
                {item.text}
              </Text>
            </_Anchor>
          </_ListItem>
        );
      })}
    </_LinkListItemGroupInner>
  );
};

const LinkList = () => {
  return (
    <_List>
      <LinkListItemGroup
        title="Wantedly"
        items={wantedlyLinks}
      ></LinkListItemGroup>
      <LinkListItemGroup title="note" items={noteLinks}></LinkListItemGroup>
      <LinkListItemGroup title="Qiita" items={qiitaLinks}></LinkListItemGroup>
    </_List>
  );
};
export default LinkList;
