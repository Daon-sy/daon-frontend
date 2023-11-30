import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import PageRoutes from "pages"
import RefreshComponent from "auth/RefreshComponent"

// Augment the palette to include a salmon color
declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"]
  }

  interface PaletteOptions {
    green?: PaletteOptions["primary"]
  }
}

// Update the Button's color options to include a salmon option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true
  }
}

let theme = createTheme({
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
    // 버튼 텍스트 자동 대문자 변환 off
    button: {
      textTransform: "none",
    },
  },
})

theme = createTheme(theme, {
  palette: {
    green: theme.palette.augmentColor({
      color: {
        main: "#7DB249",
        contrastText: "#FFFFFF",
      },
      name: "green",
    }),
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
