import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import SelectListButton, { ItemType } from "components/common/SelectListButton"
import { TASK_STATUS, TASK_STATUS_SET } from "_types/task"

interface Status extends ItemType {
  value: TASK_STATUS
}

interface Props {
  current: TASK_STATUS
  handleStatusSelect: (status: Status) => void
}

const ProgressSelectButton: React.FC<Props> = ({
  current,
  handleStatusSelect,
}: Props) => {
  const listItems: Status[] = TASK_STATUS_SET.map(
    (status, index) =>
      ({
        id: index + 1,
        text: status.description,
        value: status.value,
        color: status.chipColor,
      }) as Status,
  )
  const [TODO] = listItems

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
