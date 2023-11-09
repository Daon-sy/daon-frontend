import * as React from "react"
import styled from "styled-components"
import { Box, Menu, MenuItem, Typography } from "@mui/material"
import { TEST_IMAGE_URL } from "env"
import ShowMember from "components/modal/participant/ShowParticipantsModal"

const WorkspaceProfileWrapper = styled.button`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 16px 0;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
  border: none;
`

const WorkSpaceProfile: React.FC = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )
  const [openShowModal, setOpenShowModal] = React.useState<boolean>(false)

  const handleOpenShowModal = () => {
    setOpenShowModal(true)
  }

  const handleCloseShowModal = () => {
    setOpenShowModal(false)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!anchorElUser) {
      setAnchorElUser(event.currentTarget)
    }
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <WorkspaceProfileWrapper onClick={handleOpenUserMenu}>
        <Box
          sx={{
            width: "90%",
            height: 180,
            border: 2,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                borderRadius: 1,
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 18,
                mb: "4px",
              }}
            >
              워크스페이스 이름
            </Box>
            <Box
              component="img"
              src={`${TEST_IMAGE_URL}`}
              sx={{
                objectFit: "cover",
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            />
            <Box sx={{ width: 180, maxHeight: 140, mt: "2px" }}>
              <Box
                sx={{
                  borderRadius: 1,
                  width: "100%",
                  fontSize: 16,
                  fontWeight: "bold",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                닉네임
              </Box>
              <Box
                sx={{
                  borderRadius: 1,
                  width: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "rgba(0,0,0,0.6)",
                }}
              >
                workspace@gmail.com
              </Box>
            </Box>
          </Box>
        </Box>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElUser)}
          onClick={handleCloseUserMenu}
        >
          <MenuItem onClick={handleOpenShowModal}>
            <Typography textAlign="center" id="showMember">
              구성원보기
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">프로필 변경</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">워크스페이스 생성</Typography>
          </MenuItem>
          <MenuItem>
            <Typography textAlign="center">워크스페이스 변경</Typography>
          </MenuItem>
        </Menu>
      </WorkspaceProfileWrapper>
      <ShowMember open={openShowModal} handleClose={handleCloseShowModal} />
    </>
  )
}

export default WorkSpaceProfile
