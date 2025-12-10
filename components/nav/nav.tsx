import { Box, createTheme, ThemeProvider } from '@mui/material'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { LangSwitcher } from '../lang-switcher/langSwitcher'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CloseIcon from '@mui/icons-material/Close'

const menuItems = [
  {
    id: '0',
    name: 'services',
  },
  {
    id: '1',
    name: 'booking',
  },
  {
    id: '2',
    name: 'about',
  },
  {
    id: '3',
    name: 'contacts',
  },
]

const theme = createTheme({
  components: {
    // Name of the component
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: '#1E1E1E', borderLeft: '1px solid #FFFFFF' },
      },
    },
  },
})

export const Navigation = () => {
  const t = useTranslations()

  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 254 }} role="navigation" onClick={toggleDrawer(false)}>
      <div
        className="flex w-full items-center justify-end cursor-pointer"
        onClick={toggleDrawer(false)}
      >
        <CloseIcon
          className="text-white mt-6 mr-4 mb-10 hover:text-yellow-light active:text-yellow-default"
          fontSize="large"
        />
      </div>
      <List className="mb-10 ml-4">
        {menuItems.map((menuItem) => (
          <ListItem key={menuItem.id} disablePadding>
            <Link
              key={t(`header.menu.${menuItem.id}`)}
              href={`/#${menuItem.name}`}
              className="p-4 mb-6 text-white font-sans font-inter text-14 font-basic hover:text-yellow-light active:text-yellow-default"
            >
              {t(`header.menu.${menuItem.id}`)}
            </Link>
            {/* <ListItemText primary={t(`header.menu.${item.id}`)} /> */}
          </ListItem>
        ))}
      </List>
      <LangSwitcher isDrawer={true} />
    </Box>
  )

  return (
    <>
      <Box className="hidden tablet:flex">
        {menuItems.map((menuItem) => (
          <Link
            key={t(`header.menu.${menuItem.id}`)}
            href={`/#${menuItem.name}`}
            className="px-5 my-[2px] text-white font-sans font-inter hover:text-yellow-light active:text-yellow-default"
          >
            {t(`header.menu.${menuItem.id}`)}
          </Link>
        ))}
      </Box>

      <ThemeProvider theme={theme}>
        <Button
          onClick={toggleDrawer(true)}
          className="flex tablet:hidden text-white hover:text-yellow-light active:text-yellow-default"
        >
          <MenuIcon />
        </Button>
        <Drawer
          open={open}
          onClose={toggleDrawer(false)}
          anchor="right"
          className="flex tablet:hidden"
        >
          {DrawerList}
        </Drawer>
      </ThemeProvider>
    </>
  )
}
