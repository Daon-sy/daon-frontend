import * as React from "react"
import AddBoxIcon from "@mui/icons-material/AddBox"
import styled from "styled-components"

const CreateButton = styled.button`
  position: absolute;
  top: 10px;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
`

interface CreateBtnProps {
  handleClick: () => void
  children?: React.ReactNode
  title?: string
}

const CreateBtn = ({ handleClick, children, title }: CreateBtnProps) => {
  return (
    <CreateButton
      type="button"
      className="create_btn"
      onClick={handleClick}
      title={title}
    >
      {children}
    </CreateButton>
  )
}

CreateBtn.defaultProps = {
  children: <AddBoxIcon />,
  title: "추가",
}

export default CreateBtn
