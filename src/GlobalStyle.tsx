import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'NixgonFonts';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Light.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Light.eot?#iefix') format('embedded-opentype'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Light.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Light.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Light.ttf') format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: 'NixgonFonts';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Medium.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Medium.eot?#iefix') format('embedded-opentype'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Medium.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Medium.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Medium.ttf') format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: 'NixgonFonts';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Bold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Bold.eot?#iefix') format('embedded-opentype'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Bold.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Bold.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/webfontworld/nixgon/NixgonFonts-Bold.ttf') format("truetype");
    font-display: swap;
  }


  * {
    //font-family: Pretendard-Regular, sans-serif !important;
    font-family: NixgonFonts, Pretendard-Regular, sans-serif !important;
  }

`

export default GlobalStyle
