import React from "react"
import axios from "axios"
import { ErrorResponse, PageInfo, PageParams } from "api"
import { searchTaskApi, SearchTaskResult } from "api/search"

const useSearchTasks = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [pageInfo, setPageInfo] = React.useState<PageInfo>()
  const [resultContent, setResultContent] = React.useState<SearchTaskResult[]>()
  const [error, setError] = React.useState<ErrorResponse>()

  const fetch = async ({
    keyword,
    pageParams,
  }: {
    keyword: string
    pageParams: PageParams
  }) => {
    try {
      setIsFetching(true)
      const { data: responseBody } = await searchTaskApi(keyword, pageParams)
      setPageInfo({ ...responseBody })
      setResultContent(responseBody.content)
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
    setPageInfo(undefined)
    setResultContent(undefined)
    setError(undefined)
  }

  return { pageInfo, resultContent, fetch, isFetching, error, clear }
}

export default useSearchTasks
