import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import {
  Workspace,
  WorkspaceDetail,
  WorkspaceParticipant,
} from "_types/workspace"
import { ProjectDetail, Project } from "_types/project"
import { MemberDetail, MemberSettings } from "_types/member"
import { WorkspaceNoticeDetail } from "_types/workspaceNotice"

interface MyMemberDetailStore {
  myDetail: MemberDetail | null | undefined
  mySettings: MemberSettings | undefined
  clear: () => void
  setMyDetail: (memberDetail: MemberDetail) => void
  setMySettings: (memberSettings: MemberSettings) => void
}

export const getMyMemberDetailStore = create<MyMemberDetailStore>(set => ({
  myDetail: undefined,
  mySettings: undefined,
  clear: () => set({ myDetail: undefined, mySettings: undefined }),
  setMyDetail: (memberDetail: MemberDetail) =>
    set(state => ({ ...state, myDetail: memberDetail })),
  setMySettings: (memberSettings: MemberSettings) =>
    set(state => ({ ...state, mySettings: memberSettings })),
}))

interface WorkspaceStore {
  workspace: WorkspaceDetail | null | undefined
  myProfile: WorkspaceParticipant | null | undefined
  clear: () => void
  setWorkspace: (workspace: WorkspaceDetail) => void
  setMyProfile: (workspaceParticipant: WorkspaceParticipant) => void
}

export const getWorkspaceStore = create<WorkspaceStore>(set => ({
  workspace: undefined,
  myProfile: undefined,
  clear: () => set({ workspace: undefined, myProfile: undefined }),
  setWorkspace: (workspace: WorkspaceDetail) =>
    set(prev => ({ ...prev, workspace })),
  setMyProfile: (workspaceParticipant: WorkspaceParticipant) =>
    set(prev => ({ ...prev, myProfile: workspaceParticipant })),
}))

interface ProjectStore {
  project: ProjectDetail | null | undefined
  clear: () => void
  setProject: (project: ProjectDetail) => void
}

export const getProjectStore = create<ProjectStore>(set => ({
  project: undefined,
  clear: () => set({ project: undefined }),
  setProject: (project: ProjectDetail) => set(() => ({ project })),
}))

interface ProjectsStore {
  projects: Project[]
  clear: () => void
  setProjects: (projects: Project[]) => void
}

export const getProjectsStore = create<ProjectsStore>(set => ({
  projects: [],
  clear: () => set({ projects: [] }),
  setProjects: (projects: Project[]) => set(() => ({ projects })),
}))

interface WorkspaceListStore {
  workspaceList: Workspace[]
  setWorkspaceList: (workspaceList: Workspace[]) => void
}

export const getWorkspaceListStore = create<WorkspaceListStore>(set => ({
  workspaceList: [],
  setWorkspaceList: (workspaceList: Workspace[]) =>
    set(() => ({ workspaceList })),
}))

interface MyWorkspaceId {
  myWorkspaceId: number | null | undefined
  setMyWorkspaceId: (workspaceId: number | undefined) => void
}

export const getMyWorkspaceIdStore = create<MyWorkspaceId>(set => ({
  myWorkspaceId: null,
  setMyWorkspaceId: (myWorkspaceId: number | undefined) =>
    set(() => ({ myWorkspaceId })),
}))

interface WorkspaceNoticesStore {
  workspaceNotices: WorkspaceNoticeDetail[]
  totalPage: number
  totalCount: number
  clear: () => void
  setWorkspaceNotices: (
    workspaceNotices: WorkspaceNoticeDetail[],
    totalPage: number,
    totalCount: number,
  ) => void
}

export const getWorkspaceNoticesStore = create<WorkspaceNoticesStore>(set => ({
  workspaceNotices: [],
  totalPage: 1,
  totalCount: 0,
  clear: () => set({ workspaceNotices: [], totalCount: 0 }),
  setWorkspaceNotices: (
    workspaceNotices: WorkspaceNoticeDetail[],
    totalPage: number,
    totalCount: number,
  ) =>
    set({
      workspaceNotices,
      totalPage,
      totalCount,
    }),
}))

// persist
interface LastWorkspace {
  memberId: string
  lastConnectedWsId: number
}

interface LastWorkspaceStore {
  lastConnectedWs: LastWorkspace | undefined
  setLastConnectedWs: (lastConnectedWs: LastWorkspace) => void
}

export const getLastWorkspaceStore = create(
  persist<LastWorkspaceStore>(
    set => ({
      lastConnectedWs: undefined,
      setLastConnectedWs: (lastConnectedWs: LastWorkspace | undefined) =>
        set({ lastConnectedWs }),
    }),
    {
      name: "last-workspace-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
