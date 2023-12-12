import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import PageRoutes from "pages"
import RefreshComponent from "auth/RefreshComponent"
import { AlertDialog } from "components/common/AlertDialog"
import { getAlertStore } from "store/alertStore"

// Augment the palette to include a salmon color
declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"]
    yellow: Palette["primary"]
    blue: Palette["primary"]
    lightRed: Palette["primary"]
    gray: Palette["primary"]
    deepGray: Palette["primary"]
  }

  interface PaletteOptions {
    green?: PaletteOptions["primary"]
    yellow?: PaletteOptions["primary"]
    blue?: PaletteOptions["primary"]
    lightRed?: PaletteOptions["primary"]
    gray?: PaletteOptions["primary"]
    deepGray?: PaletteOptions["primary"]
  }
}

// Update the Button's color options to include a salmon option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true
    yellow: true
    blue: true
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    green: true
    yellow: true
    blue: true
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
    success: {
      main: "#3A4CA8",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#AE3A1E",
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
  components: {
    MuiTextField: {
      styleOverrides: {
        root: props =>
          props.ownerState.type === "password"
            ? {
                "& .MuiInputBase-input": {
                  fontFamily: "Pretendard-Regular !important",
                },
              }
            : undefined,
      },
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
      },
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
    yellow: theme.palette.augmentColor({
      color: {
        main: "#FFBE00",
        contrastText: "#FFFFFF",
      },
      name: "green",
    }),
    blue: theme.palette.augmentColor({
      color: {
        main: "#1187CF",
        contrastText: "#FFFFFF",
      },
      name: "green",
    }),
    lightRed: theme.palette.augmentColor({
      color: {
        main: "#FFECEC",
        contrastText: "#FFFFFF",
      },
      name: "lightRed",
    }),
    gray: theme.palette.augmentColor({
      color: {
        main: "#C8C8C8FF",
        contrastText: "#000000",
      },
    }),
    deepGray: theme.palette.augmentColor({
      color: {
        main: "#585858",
        contrastText: "#FFFFFF",
      },
    }),
  },
})

function App() {
  const { alertProps, clear: clearAlertProps } = getAlertStore()
  const handleConfirm = () => {
    if (alertProps?.handleConfirm) alertProps.handleConfirm()
    clearAlertProps()
  }

  return (
    <ThemeProvider theme={theme}>
      <RefreshComponent>
        <PageRoutes />
      </RefreshComponent>
      {alertProps ? (
        <AlertDialog
          open={Boolean(alertProps)}
          handleConfirm={handleConfirm}
          handleClose={handleConfirm}
        >
          {alertProps.children}
        </AlertDialog>
      ) : null}
    </ThemeProvider>
  )
}

export default App
