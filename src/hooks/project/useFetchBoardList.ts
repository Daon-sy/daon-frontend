import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { projectBoardListApi } from "api/project"
import { Board } from "_types/project"

const useFetchBoardList = (workspaceId: number) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [boards, setBoards] = React.useState<Array<Board>>([])

  const fetchBoardList = async (projectId: number) => {
    try {
      setIsFetching(true)
      const { data: responseData } = await projectBoardListApi(
        workspaceId,
        projectId,
      )
      const { boards: fetchedBoards } = responseData
      setBoards(fetchedBoards)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  return { boards, fetchBoardList, isFetching, error }
}

export default useFetchBoardList
