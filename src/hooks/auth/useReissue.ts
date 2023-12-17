import React from "react"
import axios from "axios"
import { basicAxios, ErrorResponse } from "api"
import { getTokenStore } from "store/tokenStore"

const BEARER_TYPE = "Bearer "

const useReissue = (skip = false) => {
  const [error, setError] = React.useState<ErrorResponse>()
  const {
    token,
    setToken,
    clear: clearToken,
    isFetchingReissue,
    setIsFetchingReissue,
  } = getTokenStore()

  const fetch = async () => {
    try {
      setIsFetchingReissue("FETCHING")
      const { headers } = await basicAxios.post("/api/auth/reissue")
      const authHeader: string = headers.authorization
      if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
        const accessToken = authHeader.substring(BEARER_TYPE.length)
        setToken(accessToken)
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
        const errorResponse = response?.data as ErrorResponse
        setError(errorResponse)
        clearToken()
      }
    } finally {
      setIsFetchingReissue("FETCHED")
    }
  }

  React.useEffect(() => {
    if (skip) return
    fetch()
  }, [])

  return { fetch, token, isFetchingReissue, error }
}

export default useReissue
