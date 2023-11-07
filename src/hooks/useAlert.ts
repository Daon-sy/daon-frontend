import { useSnackbar, VariantType } from "notistack"

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const addAlert = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant })
  }

  const addInfo = (message: string) => {
    addAlert(message, "info")
  }

  const addSuccess = (message: string) => {
    addAlert(message, "success")
  }

  const addError = (message: string) => {
    addAlert(message, "error")
  }

  const addWarning = (message: string) => {
    addAlert(message, "warning")
  }

  return { addAlert, addInfo, addSuccess, addWarning, addError }
}

export default { useAlert }
