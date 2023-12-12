import { authAxios, PageParams, PageResponse } from "api/index"
import { Workspace } from "_types/workspace"
import { Project } from "_types/project"
import { TaskSummary } from "_types/task"
import { AxiosResponse } from "axios"

export interface SearchWorkspaceResult extends Workspace {
  workspaceParticipantsCount: number
  createdAt: string
  modifiedAt: string
}

export interface SearchProjectResult extends Project {
  workspace: Workspace
  projectParticipantsCount: number
  createdAt: string
  modifiedAt: string
}

export interface SearchTaskResult extends TaskSummary {
  workspace: Workspace
  createdAt: string
  modifiedAt: string
}

export interface SearchResponseBody {
  workspaces: PageResponse<SearchWorkspaceResult>
  projects: PageResponse<SearchProjectResult>
  tasks: PageResponse<SearchTaskResult>
}

export const searchApi = async (
  keyword: string,
): Promise<AxiosResponse<SearchResponseBody>> => {
  return authAxios.get("/api/search", {
    params: { keyword },
  })
}

export const searchWorkspaceApi = async (
  keyword: string,
  pageParams: PageParams,
): Promise<AxiosResponse<PageResponse<SearchWorkspaceResult>>> => {
  return authAxios.get("/api/search/workspaces", {
    params: { keyword, ...pageParams },
  })
}

export const searchProjectApi = async (
  keyword: string,
  pageParams: PageParams,
): Promise<AxiosResponse<PageResponse<SearchProjectResult>>> => {
  return authAxios.get("/api/search/projects", {
    params: { keyword, ...pageParams },
  })
}

export const searchTaskApi = async (
  keyword: string,
  pageParams: PageParams,
): Promise<AxiosResponse<PageResponse<SearchTaskResult>>> => {
  return authAxios.get("/api/search/tasks", {
    params: { keyword, ...pageParams },
  })
}
