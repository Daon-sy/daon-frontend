import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { getMyMemberDetailStore } from "store/userStore"
import { memberSettingsApi } from "api/member"

const useFetchMySettings = (skip = false) => {
  const { mySettings, setMySettings } = getMyMemberDetailStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetch = async () => {
    try {
      setIsFetching(true)
      const { data: responseBody } = await memberSettingsApi()
      setMySettings(responseBody)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  React.useLayoutEffect(() => {
    if (skip) return
    fetch()
  }, [])

  return { mySettings, fetch, isFetching, error }
}

export default useFetchMySettings
