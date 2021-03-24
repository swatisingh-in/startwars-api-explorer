import { createGlobalStyle, css } from 'styled-components';
import BackgroundImage from './images/bg.png';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;700&display=swap');
  
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */
  
   html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  
  /* HTML5 display-role reset for older browsers */
  
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  body {
    background: #000 url(${BackgroundImage}) no-repeat;
    background-size: cover;
    color: #FFF;
    line-height: 1;
    font-family:  sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  /* Global styles -- App */
  
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

export const breakpoints = {
  medium: 720,
  large: 1024,
};

export const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}px) {
      ${css(...args)}
    }
  `;

  acc[`not_${label}`] = (...args) => css`
    @media (max-width: ${breakpoints[label] - 1}px) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});
