import { useSnackbar, VariantType } from "notistack"

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar()

  const addAlert = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant })
  }

  const addInfo = (message: string) => {
    enqueueSnackbar(message, { variant: "info" })
  }

  const addSuccess = (message: string) => {
    enqueueSnackbar(message, { variant: "success" })
  }

  const addError = (message: string) => {
    enqueueSnackbar(message, { variant: "error" })
  }

  const addWarning = (message: string) => {
    enqueueSnackbar(message, { variant: "warning" })
  }

  return { addAlert, addInfo, addSuccess, addWarning, addError }
}

export default { useAlert }
