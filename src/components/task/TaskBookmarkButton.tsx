import React from "react"
import { ToggleButton, Tooltip } from "@mui/material"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"

interface Props {
  bookmarked: boolean
  handleClick: () => void
}

const TaskBookmarkButton = ({ bookmarked, handleClick }: Props) => {
  return (
    <Tooltip title="북마크" arrow>
      <ToggleButton
        value="check"
        selected={false}
        size="small"
        sx={{
          padding: 0.5,
          borderStyle: "none",
        }}
        onClick={e => {
          handleClick()
          e.stopPropagation()
        }}
      >
        {bookmarked ? (
          <BookmarkIcon sx={{ color: "secondary.main" }} />
        ) : (
          <BookmarkBorderIcon />
        )}
      </ToggleButton>
    </Tooltip>
  )
}

export default TaskBookmarkButton
