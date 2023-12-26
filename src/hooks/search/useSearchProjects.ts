import React from "react"
import axios from "axios"
import { ErrorResponse, PageInfo, PageParams } from "api"
import { searchProjectApi, SearchProjectResult } from "api/search"

const useSearchProjects = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [pageInfo, setPageInfo] = React.useState<PageInfo>()
  const [resultContent, setResultContent] =
    React.useState<SearchProjectResult[]>()
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
      const { data: responseBody } = await searchProjectApi(keyword, {
        size: 5,
        ...pageParams,
      })
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

export default useSearchProjects
