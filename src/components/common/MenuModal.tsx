import React from "react"
import {
  Box,
  DialogContent,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material"
import TitleDialog from "./TitleDialog"

export interface MenuWithPage {
  pageName: string
  pageValue: string
  pageComponent: React.ReactNode
}

interface Props {
  open: boolean
  handleClose: () => void
  menuWithPageList: MenuWithPage[]
}

const MenuModal = ({ open, handleClose, menuWithPageList = [] }: Props) => {
  const [selectedPage, setSelectedPage] = React.useState<string | undefined>(
    menuWithPageList.length > 0 ? menuWithPageList[0].pageValue : undefined,
  )

  return (
    <TitleDialog
      open={open}
      handleClose={handleClose}
      padding={0}
      height={600}
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
          </DialogContent>

          <DialogContent
            sx={{
              width: "100%",
            }}
          >
            <Box sx={{ paddingX: 4, paddingBottom: 10 }}>
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
