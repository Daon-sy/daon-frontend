import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SelectListButton, { ItemType } from "components/common/SelectListButton"

interface Status extends ItemType {
  value: string
}

interface Props {
  current: string
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

const ProgressSelectButton: React.FC<Props> = ({ current }: Props) => {
  const listItems = [TODO, PROCEEDING, COMPLETED, PENDING]

  const foundData = listItems.find(item => item.value === current)

  return (
    <SelectListButton
      itemToChip
      changeButtonColor
      defaultValueId={foundData?.id || TODO.id}
      valueList={listItems}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={selectedValue => console.log(selectedValue.value)}
      variant="contained"
    />
  )
}

export default ProgressSelectButton
