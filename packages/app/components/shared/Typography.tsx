import styled from 'styled-components';
import colors from '../../constants/colors';

export const Title = styled.h2<{
  size?: number;
  weight?: string;
  color?: string;
}>`
  font-size: ${({ size }) => (size ? `${size}px` : '80px')};
  font-family: Roboto;
  font-weight: ${({ weight }) => (weight ? weight : 'bold')};
  color: ${({ color }) => (color ? color : colors.text.primary)};
  margin: 0;
`;

export const Text = styled.p<{
  size?: number;
  weight?: string;
  color?: string;
}>`
  font-size: ${({ size }) => (size ? `${size}px` : '20px')};
  font-family: Roboto;
  font-weight: ${({ weight }) => (weight ? weight : 'normal')};
  color: ${({ color }) => (color ? color : colors.text.primary)};
  margin: 0;
  line-height: 2;
`;
