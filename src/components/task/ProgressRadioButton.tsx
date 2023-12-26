import React, { useState } from "react"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { TASK_STATUS, TASK_STATUS_SET } from "_types/task"

interface Status {
  value: TASK_STATUS
  description: string
  color: string
}

interface Props {
  current: TASK_STATUS
  handleStatusCheck: (status: TASK_STATUS) => void
}

const ProgressRadioButton: React.FC<Props> = ({
  current,
  handleStatusCheck,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<TASK_STATUS>(current)
  const listItems: Status[] = TASK_STATUS_SET.map(
    (status, index) =>
      ({
        id: index + 1,
        description: status.description,
        value: status.value,
        color: status.color,
      }) as Status,
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value as TASK_STATUS)
  }
  return (
    <FormControl>
      <FormLabel
        id="진행상태"
        sx={{
          pt: 2,
          pb: 2,
          fontWeight: "bold",
          color: "#1f4838",
          fontSize: "18px",
        }}
      >
        진행상태
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="진행상태"
        name="row-radio-buttons-group"
        value={selectedValue}
        onChange={handleChange}
        sx={{
          width: "500px",
          display: "flex",
          justifyContent: "space-evenly",
          height: "32px",
          ".MuiRadio-root": {
            visibility: "hidden",
            width: "32px",
          },
        }}
      >
        {listItems.map(list => (
          <FormControlLabel
            key={list.value}
            sx={{
              height: "32px",
              borderRadius: "15px",
              width: "95px",
              bgcolor: selectedValue === list.value ? list.color : "#eeeeee",
              color: selectedValue === list.value ? "#ffffff" : "#7f7f7f",
            }}
            value={list.value}
            control={<Radio />}
            label={list.description}
            onChange={() => handleStatusCheck(list.value)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default ProgressRadioButton
