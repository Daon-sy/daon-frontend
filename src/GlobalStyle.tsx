import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Cafe24SsurroundRegular2 from "./assets/fonts/Cafe24SsurroundAir.woff2"
import Cafe24SsurroundBold2 from "./assets/fonts/Cafe24Ssurround.woff2"

const GlobalStyle = createGlobalStyle`
  ${reset}
  
@font-face {
  font-family: 'Cafe24Ssurround';
  src: url(${Cafe24SsurroundRegular2}) format("woff2");
  font-display: swap;
  font-weight: 400;
}
@font-face {
  font-family: 'Cafe24Ssurround';
  src: url(${Cafe24SsurroundBold2}) format("woof2");
  font-display: swap;
  font-weight: 500;
}


  * {
    font-family: Cafe24Ssurround, sans-serif !important;
  }


`

export default GlobalStyle
