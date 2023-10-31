import React from "react"
import ReactDOM from "react-dom/client"
import App from "App"
import { SnackbarProvider } from "notistack"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={5}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
)
