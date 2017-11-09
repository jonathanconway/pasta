import { injectGlobal }  from 'styled-components'
export const inject = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,500');
  @import url('https://fonts.googleapis.com/css?family=Goudy+Bookletter+1911');


  // Typography

  body, input, textarea, button {
    font-family: 'Source Sans Pro';
  }

  h1, h2, h3 {
    font-family: 'Goudy Bookletter 1911', 'Times New Roman', serif;
  }`