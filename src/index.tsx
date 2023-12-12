import React from "react"
import ReactDOM from "react-dom/client"
import App from "App"
import { SnackbarProvider } from "notistack"
import GlobalStyle from "./GlobalStyle"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  // <React.StrictMode>
  <>
    <GlobalStyle />
    <SnackbarProvider
      maxSnack={3}
      transitionDuration={{
        enter: 200,
        exit: 200,
      }}
      // preventDuplicate
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <App />
    </SnackbarProvider>
  </>,
  // </React.StrictMode>,
)
