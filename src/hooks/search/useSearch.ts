import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { searchApi, SearchResponseBody } from "api/search"
import { useAlert } from "hooks/useAlert"

const useSearch = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [searchResult, setSearchResult] = React.useState<SearchResponseBody>()
  const [error, setError] = React.useState<ErrorResponse>()
  const { addError } = useAlert()

  const fetch = async (keyword: string) => {
    if (!keyword) {
      addError("검색어를 입력하세요")
      return
    }

    try {
      setIsFetching(true)
      const { data: responseBody } = await searchApi(keyword)
      setSearchResult(responseBody)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  const clear = () => {
    setSearchResult(undefined)
    setError(undefined)
    setIsFetching(false)
  }

  return { searchResult, fetch, isFetching, error, clear }
}

export default useSearch
