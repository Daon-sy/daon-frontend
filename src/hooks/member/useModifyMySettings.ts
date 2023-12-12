import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { getMyMemberDetailStore } from "store/userStore"
import {
  modifyMemberSettingsApi,
  ModifyMemberSettingsRequestBody,
} from "api/member"
import { useSnackbar } from "notistack"

const useFetchMySettings = () => {
  const { mySettings, setMySettings } = getMyMemberDetailStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { enqueueSnackbar } = useSnackbar()

  const fetch = async (requestBody: ModifyMemberSettingsRequestBody) => {
    try {
      setIsFetching(true)
      await modifyMemberSettingsApi(requestBody)
      setMySettings({ ...mySettings, notified: requestBody.notified })
      enqueueSnackbar(`알림 ${requestBody.notified ? "ON" : "OFF"}`, {
        variant: "success",
      })
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { fetch, isFetching, error }
}

export default useFetchMySettings
