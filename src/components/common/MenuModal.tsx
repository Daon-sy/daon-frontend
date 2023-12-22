import React from "react"
import {
  Box,
  DialogContent,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material"
import { getWorkspaceStore } from "store/userStore"
import TitleDialog from "./TitleDialog"
import { WORKSPACE_PARTICIPANT_ROLE } from "../../_types/workspace"

export interface MenuWithPage {
  pageName: string
  pageValue: string
  pageComponent: React.ReactNode
}

interface Props {
  open: boolean
  title: string
  minWidth: string
  handleClose: () => void
  menuWithPageList: MenuWithPage[]
  removeButton?: React.ReactNode
  allowedEditRoles?: WORKSPACE_PARTICIPANT_ROLE[]
}

const MenuModal = ({
  open,
  title,
  minWidth,
  handleClose,
  menuWithPageList = [],
  removeButton,
  allowedEditRoles = [],
}: Props) => {
  const [selectedPage, setSelectedPage] = React.useState<string | undefined>(
    menuWithPageList.length > 0 ? menuWithPageList[0].pageValue : undefined,
  )
  const { myProfile } = getWorkspaceStore()

  return (
    <TitleDialog
      open={open}
      handleClose={handleClose}
      padding={0}
      minWidth={minWidth}
      height={560}
      color="#727272"
      right={20}
    >
      <Box height="100%">
        <Stack direction="row" height="100%">
          <DialogContent
            sx={{
              pt: 10,
              pl: 4,
              bgcolor: "#1F4838",
              width: 300,
              border: "none",
              overflowX: "hidden",
            }}
          >
            <Box height="100%" width="100%">
              <Stack spacing={1}>
                <RadioGroup
                  value={selectedPage}
                  color="primary"
                  onChange={e => setSelectedPage(e.target.value)}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    ".MuiRadio-root": {
                      visibility: "hidden",
                      width: 40,
                    },
                    ".MuiButtonBase-root.Mui-checked": {
                      boxShadow: "none",
                    },
                  }}
                >
                  {menuWithPageList?.map(mwp => (
                    <FormControlLabel
                      key={mwp.pageName}
                      sx={{
                        width: 234,
                        height: 60,
                        "& .MuiFormControlLabel-root": {
                          mr: 0,
                        },
                        "& .MuiFormControlLabel-label": {
                          fontSize: "20px",
                          mx: 0,
                          my: 2,
                          border: 0,
                        },
                        bgcolor:
                          selectedPage === mwp.pageValue
                            ? "#ffffff"
                            : "#1F4838",
                        color:
                          selectedPage === mwp.pageValue
                            ? "#7f7f7f"
                            : "#ffffff",
                      }}
                      value={mwp.pageValue}
                      label={mwp.pageName}
                      control={<Radio sx={{ color: "#ffffff" }} />}
                    />
                  ))}
                </RadioGroup>
              </Stack>
            </Box>
            {myProfile && allowedEditRoles?.includes(myProfile.role) ? (
              <Box mt={1} sx={{ position: "absolute", bottom: 10, left: 120 }}>
                {removeButton}
              </Box>
            ) : null}
          </DialogContent>

          <DialogContent
            sx={{
              width: "100%",
              minWidth: 600,
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                color: "#777777",
                fontWeight: "bold",
                mb: 5,
              }}
            >
              {title}
            </Typography>
            <Box sx={{ paddingX: 4 }}>
              {
                menuWithPageList.find(mwp => mwp.pageValue === selectedPage)
                  ?.pageComponent
              }
            </Box>
          </DialogContent>
        </Stack>
      </Box>
    </TitleDialog>
  )
}

export default MenuModal
