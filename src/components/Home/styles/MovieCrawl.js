import styled from 'styled-components';

const MovieCrawl = styled.div`
  font-size: 12px;
  height: 72px;
  line-height: 18px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;

  &:after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 33px;
    background: linear-gradient(to bottom,rgba(255,255,255,0), #31353a);
  }
`;

export default MovieCrawl;
