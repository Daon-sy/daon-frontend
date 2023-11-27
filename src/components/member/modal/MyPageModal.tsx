import {
  Box,
  DialogContent,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import TitleModal from "components/common/TitleModal"
import React from "react"
import { getMyMemberDetailStore } from "store/userStore"
import MyPageDataManage from "../MyPageDataManage"
import MyPageModify from "../MyPageModify"

type PageType = "home" | "modify"

interface MenuProps {
  page: string
  setPage: (page: PageType) => void
}

const Menu = ({ page, setPage }: MenuProps) => {
  return (
    <Box height="100%">
      <Stack>
        <ToggleButtonGroup
          orientation="vertical"
          value={page}
          exclusive
          sx={{
            backgroundColor: "darksalmon",
          }}
          onChange={(e: React.MouseEvent<HTMLElement>, newPage: PageType) =>
            newPage && setPage(newPage)
          }
        >
          <ToggleButton value="home">My Home</ToggleButton>
          <ToggleButton value="modify">Modify</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}

const Body = ({ page }: { page: PageType }) => {
  const renderPage = () => {
    switch (page) {
      case "home":
        return <MyPageDataManage />
      case "modify":
        return <MyPageModify />
      default:
        return null
    }
  }
  return <Box>{renderPage()}</Box>
}

interface MyPageProps {
  open: boolean
  handleClose: () => void
}

const MyPageModal = ({ open = false, handleClose }: MyPageProps) => {
  const { myDetail } = getMyMemberDetailStore()
  const [page, setPage] = React.useState<PageType>("home")
  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title="마이페이지"
      subTitle={
        <Box>
          <Typography> 사용자 : {myDetail?.name} </Typography>
        </Box>
      }
    >
      <Box sx={{ display: "flex" }}>
        <Stack direction="row">
          <DialogContent>
            <Menu page={page} setPage={setPage} />
          </DialogContent>
          <Divider orientation="vertical" />
          <DialogContent>
            <Body page={page} />
          </DialogContent>
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default MyPageModal
