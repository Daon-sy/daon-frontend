import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SelectListButton, { ItemType } from "components/common/SelectListButton"
import { TASK_STATUS } from "_types/task"

interface Status extends ItemType {
  value: TASK_STATUS
}

const TODO: Status = {
  id: 1,
  text: "할 일",
  value: "TODO",
  color: "info",
}
const PROCEEDING: Status = {
  id: 2,
  text: "진행중",
  value: "PROCEEDING",
  color: "primary",
}
const COMPLETED: Status = {
  id: 3,
  text: "완료됨",
  value: "COMPLETED",
  color: "success",
}
const PENDING: Status = {
  id: 4,
  text: "보류중",
  value: "PENDING",
  color: "warning",
}

interface Props {
  current: TASK_STATUS
  handleStatusSelect: (status: Status) => void
}

const ProgressSelectButton: React.FC<Props> = ({
  current,
  handleStatusSelect,
}: Props) => {
  const listItems = [TODO, PROCEEDING, COMPLETED, PENDING]

  const foundData = listItems.find(item => item.value === current)

  return (
    <SelectListButton
      itemToChip
      changeButtonColor
      defaultValueId={foundData?.id || TODO.id}
      valueList={listItems}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={status =>
        status ? handleStatusSelect(status) : undefined
      }
      variant="contained"
    />
  )
}

export default ProgressSelectButton
