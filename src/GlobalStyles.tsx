import { createGlobalStyle } from "styled-components";

/*
  Most of Font Size generated
  on https://type-scale.com/
  for Comfortaa font
  with 1.250 Major Third scale */
export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;600&display=swap');

  @keyframes keep-spinning {
    0%    { transform: rotate(0deg); }
    25%   { transform: rotate(90deg); }
    50%   { transform: rotate(180deg); }
    75%   { transform: rotate(270deg); }
    100%  { transform: rotate(360deg); }
  }

  html {font-size: 100%;} /*16px*/

  body {
    font-family: 'Comfortaa', sans-serif;
    font-weight: 300;
    line-height: 1.75;
    color: #333;
    margin: 0;
    padding: 0;
  }

  body * {
    box-sizing: border-box;
  }

  p {
    margin-bottom: 1rem;
  }

  h1, h2, h3, h4, h5 {
    margin: 3rem 0 1.38rem;
    font-family: 'Comfortaa', sans-serif;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
    font-size: 3.052rem;
  }

  h2 {
    font-size: 2.441rem;
  }

  h3 {
    font-size: 1.953rem;
  }

  h4 {
    font-size: 1.563rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  small {
    font-size: 0.8rem;
  }


`;
