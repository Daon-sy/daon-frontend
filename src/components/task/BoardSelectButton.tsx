import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import FolderIcon from "@mui/icons-material/Folder"
import SelectListButton, { ItemType } from "components/common/SelectListButton"
import { getWorkspaceStore } from "store/userStore"
import { Board } from "_types/ProjectType"
import { boardListApi } from "api/projectApi"

interface Props {
  projectId?: number
  currentBoardId?: number
  handleBoardSelect: (board: Board) => void
}

const BoardSelectButton: React.FC<Props> = ({
  projectId,
  currentBoardId,
  handleBoardSelect,
}: Props) => {
  const { workspace } = getWorkspaceStore()
  const [boards, setBoards] = React.useState<Array<Board>>()

  React.useEffect(() => {
    if (projectId) {
      const fetchData = async () => {
        const { data: responseData } = await boardListApi(
          workspace!.id,
          projectId,
        )
        const { boards: fetchedBoards } = responseData.data
        setBoards(fetchedBoards)
      }
      fetchData()
    }
  }, [projectId])

  return (
    <SelectListButton
      unsetButtonText="보드 선택"
      showClearListItem
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
        handleBoardSelect({ boardId: item.id, title: item.text })
      }
      clearOnListUpdated
    />
  )
}

export default BoardSelectButton
