import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Cafe24SsurroundRegular from "./assets/fonts/Cafe24SsurroundAir.woff"
import Cafe24SsurroundBold from "./assets/fonts/Cafe24Ssurround.woff"
import Cafe24SsurroundBoldTTF from "./assets/fonts/Cafe24Ssurround.ttf"

const GlobalStyle = createGlobalStyle`
  ${reset}
  
@font-face {
  font-family: 'Cafe24Ssurround';
  src: url(${Cafe24SsurroundRegular}) format("woff");
  font-display: swap;
  font-weight: 400;
}
@font-face {
  font-family: 'Cafe24Ssurround';
  src: url(${Cafe24SsurroundBold}) format("woff"), url(${Cafe24SsurroundBoldTTF}) format("truetype");
  font-display: swap;
  font-weight: 500;
}


  * {
    font-family: Cafe24Ssurround, sans-serif !important;
  }


`

export default GlobalStyle
