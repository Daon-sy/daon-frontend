import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import FolderIcon from "@mui/icons-material/Folder"
import SelectListButton, { ItemType } from "components/common/SelectListButton"
import { getWorkspaceStore } from "store/userStore"
import { Board } from "_types/project"
import { projectBoardListApi } from "api/project"

interface Props {
  projectId?: number
  currentBoardId?: number
  handleBoardSelect: (board: Board | undefined) => void
  showClearListItem?: boolean
}

const BoardSelectButton: React.FC<Props> = ({
  projectId,
  currentBoardId,
  handleBoardSelect,
  showClearListItem = false,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const [boards, setBoards] = React.useState<Array<Board>>()

  React.useEffect(() => {
    if (projectId) {
      const fetchData = async () => {
        const { data: responseData } = await projectBoardListApi(
          workspace!.workspaceId,
          projectId,
        )
        const { boards: fetchedBoards } = responseData
        setBoards(fetchedBoards)
      }
      fetchData()
    }
  }, [projectId])

  return (
    <SelectListButton
      unsetButtonText="보드 선택"
      showClearListItem={showClearListItem}
      defaultValueId={currentBoardId}
      valueList={boards?.map(
        (board: Board): ItemType => ({
          id: board.boardId,
          text: board.title,
        }),
      )}
      leftMuiIcon={<FolderIcon />}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={item =>
        handleBoardSelect(
          item ? { boardId: item.id, title: item.text } : undefined,
        )
      }
      clearOnListUpdated
    />
  )
}

export default BoardSelectButton
