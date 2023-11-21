import { create } from "zustand"
import { WorkspaceDetail, WorkspaceParticipant } from "_types/workspace"
import { ProjectDetail, Project } from "_types/project"
import { MemberDetail } from "_types/member"

interface MyMemberDetailStore {
  myDetail: MemberDetail | null | undefined
  clear: () => void
  setMyDetail: (memberDetail: MemberDetail) => void
}

export const getMyMemberDetailStore = create<MyMemberDetailStore>(set => ({
  myDetail: undefined,
  clear: () => set({ myDetail: undefined }),
  setMyDetail: (memberDetail: MemberDetail) =>
    set(() => ({ myDetail: memberDetail })),
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
