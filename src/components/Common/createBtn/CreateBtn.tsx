import * as React from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import "./CreateBtn.css"

interface CreateBtnProps {
  handleClick: () => void
  children?: React.ReactNode
  title?: string
}

const CreateBtn = ({ handleClick, children, title }: CreateBtnProps) => {
  return (
    <button
      type="button"
      className="create_btn"
      onClick={handleClick}
      title={title}
    >
      {children}
    </button>
  )
}

CreateBtn.defaultProps = {
  children: <AddBoxIcon />,
  title: "추가",
}

export default CreateBtn
