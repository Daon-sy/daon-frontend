import React from "react"
import { Box, Typography } from "@mui/material"
import { getMyMemberDetailStore } from "store/userStore"
import MenuModal, { MenuWithPage } from "components/common/MenuModal"
import MyPageDataManage from "../MyPageDataManage"
import MyPageModify from "../MyPageModify"

interface MyPageProps {
  open: boolean
  handleClose: () => void
}

const MyPageModal = ({ open = false, handleClose }: MyPageProps) => {
  const { myDetail } = getMyMemberDetailStore()

  const menuWithPageList: MenuWithPage[] = [
    {
      pageName: "Home",
      pageValue: "Home",
      pageComponent: <MyPageDataManage />,
    },
    {
      pageName: "Modify",
      pageValue: "Modify",
      pageComponent: <MyPageModify />,
    },
  ]

  return (
    <MenuModal
      open={open}
      handleClose={handleClose}
      title="마이페이지"
      subTitle={
        <Box>
          <Typography> 사용자 : {myDetail?.name} </Typography>
        </Box>
      }
      menuWithPageList={menuWithPageList}
    />
  )
}

export default MyPageModal
