import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { projectListApi } from "api/project"
import { getProjectsStore } from "store/userStore"

const useFetchProjectList = (workspaceId: number, skip = false) => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const { projects, setProjects } = getProjectsStore()

  const fetchProjectList = async () => {
    try {
      setIsFetching(true)
      const { data: responseData } = await projectListApi(workspaceId)
      const { projects: fetchedProjects } = responseData
      setProjects(fetchedProjects)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (skip) return
    fetchProjectList()
  }, [])

  return { projects, fetchProjectList, isFetching, error }
}

export default useFetchProjectList
