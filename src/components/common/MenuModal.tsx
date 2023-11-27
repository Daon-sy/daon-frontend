import React from "react"
import { Box, DialogContent, Divider, Stack } from "@mui/material"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ToggleButton from "@mui/material/ToggleButton"
import TitleModal from "components/common/TitleModal"

export interface MenuWithPage {
  pageName: string
  pageValue: string
  pageComponent: React.ReactNode
}

interface Props {
  open: boolean
  handleClose: () => void
  title?: string | React.ReactNode
  subTitle?: string | React.ReactNode
  menuWithPageList: MenuWithPage[]
}

const MenuModal = ({
  open,
  handleClose,
  title,
  subTitle,
  menuWithPageList = [],
}: Props) => {
  const [selectedPage, setSelectedPage] = React.useState<number | undefined>(
    menuWithPageList.length > 0 ? 0 : undefined,
  )

  return (
    <TitleModal
      open={open}
      handleClose={handleClose}
      title={title}
      subTitle={subTitle}
      padding={0}
      height={600}
    >
      <Box height="100%">
        <Stack direction="row" height="100%">
          <DialogContent
            sx={{
              padding: 0,
              width: 300,
              height: "100%",
            }}
          >
            <Box height="100%">
              <Stack spacing={1} p={1}>
                <ToggleButtonGroup
                  orientation="vertical"
                  value={selectedPage}
                  exclusive
                  sx={{
                    backgroundColor: "white",
                  }}
                  color="primary"
                  onChange={(
                    e: React.MouseEvent<HTMLElement>,
                    newPageValue: number,
                  ) => setSelectedPage(newPageValue)}
                >
                  {menuWithPageList?.map((mwp, index) => (
                    <ToggleButton value={index}>{mwp.pageName}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>
            </Box>
          </DialogContent>
          <Divider orientation="vertical" />
          <DialogContent
            sx={{
              width: "100%",
            }}
          >
            <Box sx={{ paddingX: 4, paddingBottom: 10 }}>
              {typeof selectedPage === "number"
                ? menuWithPageList[selectedPage]?.pageComponent
                : null}
            </Box>
          </DialogContent>
        </Stack>
      </Box>
    </TitleModal>
  )
}

export default MenuModal
