import React from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import PageRoutes from "pages"
import RefreshComponent from "auth/RefreshComponent"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F4838",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFBE00",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F6F7F9",
    },
  },
  typography: {
    fontSize: 14,
    // 버튼 텍스트 자동 대문자 변환 off
    button: {
      textTransform: "none",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RefreshComponent>
        <PageRoutes />
      </RefreshComponent>
    </ThemeProvider>
  )
}

export default App
