import React from "react"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import Box from "@mui/material/Box"

interface Props {
  date?: string | undefined
  handleChange: (value: dayjs.Dayjs | null) => void
}

const CalendarDateField = ({ date, handleChange }: Props) => {
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            format="YYYY-MM-DD"
            defaultValue={date ? dayjs(date) : null}
            sx={{
              width: "100%",
            }}
            slotProps={{
              field: {
                clearable: true,
                onKeyDown: e => e.preventDefault(),
              },
            }}
            onChange={handleChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  )
}

export default CalendarDateField
