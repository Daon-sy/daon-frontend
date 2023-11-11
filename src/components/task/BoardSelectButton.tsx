import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import FolderIcon from "@mui/icons-material/Folder"
import SelectListButton from "components/common/SelectListButton"
import { Board } from "_types/TaskType"

interface Props {
  current?: Board
}

const BoardSelectButton: React.FC<Props> = ({ current }: Props) => {
  const listItems = [
    {
      id: 1,
      text: "Board1",
    },
    {
      id: 2,
      text: "Board2",
    },
  ]

  return (
    <SelectListButton
      unsetButtonText="보드 선택"
      showClearListItem
      defaultValueId={current?.boardId}
      valueList={listItems}
      leftMuiIcon={<FolderIcon />}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={selectedValue => console.log(selectedValue)}
    />
  )
}

export default BoardSelectButton
