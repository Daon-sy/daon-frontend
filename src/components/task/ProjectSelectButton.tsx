import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import DvrIcon from "@mui/icons-material/Dvr"
import SelectListButton from "components/common/SelectListButton"

const ProjectSelectButton: React.FC = () => {
  const listItems = [
    {
      id: 1,
      text: "Project1",
    },
    {
      id: 2,
      text: "Project2",
    },
  ]

  return (
    <SelectListButton
      unsetButtonText="프로젝트 선택"
      valueList={listItems}
      leftMuiIcon={<DvrIcon />}
      endMuiIcon={<KeyboardArrowDownIcon />}
      onValueChange={selectedValue => console.log(selectedValue)}
    />
  )
}

export default ProjectSelectButton
