import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DvrIcon from "@mui/icons-material/Dvr"
import SelectListButton, { ItemType } from "components/common/SelectListButton"
import { projectListApi } from "api/project"
import { getWorkspaceStore } from "store/userStore"
import { Project } from "_types/project"

interface ProjectItemType extends ItemType {
  description: string | null | undefined
}

interface Props {
  handleProjectSelect: (project: ProjectItemType) => void
}

const ProjectSelectButton: React.FC<Props> = ({
  handleProjectSelect,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const [projects, setProjects] = React.useState<Array<Project>>()

  React.useEffect(() => {
    if (!projects) {
      const fetchData = async () => {
        const { data: responseData } = await projectListApi(
          workspace!.workspaceId,
        )
        const { projects: fetchedProjects } = responseData
        setProjects(fetchedProjects)
      }
      fetchData()
    }
  }, [])

  return (
    <SelectListButton
      unsetButtonText="프로젝트 선택"
      valueList={projects?.map(
        (project: Project): ProjectItemType => ({
          id: project.projectId,
          text: project.title,
          description: project.description,
        }),
      )}
      leftMuiIcon={<DvrIcon />}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={project =>
        project ? handleProjectSelect(project) : undefined
      }
    />
  )
}

export default ProjectSelectButton