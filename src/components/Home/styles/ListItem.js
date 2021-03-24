import styled from 'styled-components';
import { media } from '../../../styles';

const ListItem = styled.li`
  list-style: none;
  padding: 16px 0 0 16px;
  width: 100%;

  ${media.medium`
    width: 50%;
  `}

  ${media.large`
    width: 33%;
  `}

`;

export default ListItem;
