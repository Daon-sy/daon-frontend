import React from "react"
import { ToggleButton, Tooltip } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"

interface Props {
  bookmarked: boolean
  handleClick: () => void
  fontSize?: string
  padding?: number
}

const TaskBookmarkButton = ({
  bookmarked,
  handleClick,
  fontSize,
  padding = 0.5,
}: Props) => {
  return (
    <Tooltip title="북마크" arrow>
      <ToggleButton
        value="check"
        selected={false}
        size="small"
        sx={{
          padding,
          borderStyle: "none",
        }}
        onClick={e => {
          handleClick()
          e.stopPropagation()
        }}
      >
        {bookmarked ? (
          <BookmarkIcon sx={{ color: "secondary.main", fontSize }} />
        ) : (
          <BookmarkBorderIcon sx={{ fontSize }} />
        )}
      </ToggleButton>
    </Tooltip>
  )
}

export default TaskBookmarkButton
