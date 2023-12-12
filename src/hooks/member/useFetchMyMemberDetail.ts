import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { getMyMemberDetailStore } from "store/userStore"
import { myMemberDetailApi } from "api/member"

const useFetchMyMemberDetail = () => {
  const { myDetail, setMyDetail } = getMyMemberDetailStore()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()

  const fetch = async () => {
    try {
      setIsFetching(true)
      const { data: responseBody } = await myMemberDetailApi()
      setMyDetail(responseBody)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { myDetail, fetch, isFetching, error }
}

export default useFetchMyMemberDetail
