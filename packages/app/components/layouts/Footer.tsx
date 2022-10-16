import styled from 'styled-components';
import colors from '../../constants/colors';
import { Text } from '../shared/Typography';

const _Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 8px;
  background: ${colors.background.primary};
`;

const Footer = () => {
  return (
    <_Footer>
      <Text size={16} color="white">
        © Ikkei Harashima 2022
      </Text>
    </_Footer>
  );
};

export default Footer;
