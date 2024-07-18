import { useCallback, useState } from 'react'
import { ContentWrapper } from '../layouts/contentWrapper'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { Box, Menu, MenuItem } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

type LangsT = {
  code: string
  lang: string
}

const langs: LangsT[] = [
  { code: 'en', lang: 'EN' },
  { code: 'pl', lang: 'PL' },
]

const menuItems = ['1', '2']

export const Header = ({ isFooter }: { isFooter?: boolean }) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const t = useTranslations()
  const { locale, route } = useRouter()
  const dispatch = useDispatch()

  const liClassName = useCallback(
    (lang: LangsT) =>
      `mx-1 tablet:mx-3 p-1 cursor-pointer text-black tablet:text-white font-sans font-inter ${
        lang.code === locale ? 'font-super-bold' : 'font-basic'
      }`,
    [locale]
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <div
      className={`w-full ${
        isFooter ? 'border-t' : 'border-b'
      } border-white border-solid`}
    >
      <ContentWrapper>
        <div className="flex flex-row items-center justify-between w-full">
          <Link href={'/'} className="text-2xl my-7 font-sans font-inter">
            Darya Logo
          </Link>
          <Box className="hidden tablet:flex">
            {menuItems.map((menuItem) => (
              <Link
                key={t(`header.menu.${menuItem}`)}
                href={`/#${menuItem === '1' ? 'about' : 'contacts'}`}
                className="px-5 my-[2px] text-white font-sans font-inter"
              >
                {t(`header.menu.${menuItem}`)}
              </Link>
            ))}
          </Box>
          <ul className="hidden tablet:flex flex-row">
            {langs.map((lang) => {
              return (
                <li key={lang.code} className={liClassName(lang)}>
                  <Link href={route} locale={lang.code}>
                    {lang.lang}
                  </Link>
                </li>
              )
            })}
          </ul>

          <Box className="flex tablet:hidden">
            <div onClick={handleOpenUserMenu} className="flex w-fit h-fit">
              <MenuIcon />
            </div>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuItems.map((menuItem) => (
                <MenuItem
                  key={t(`header.menu.${menuItem}`)}
                  onClick={handleCloseUserMenu}
                >
                  <Link
                    key={t(`header.menu.${menuItem}`)}
                    href={`/#${menuItem === '1' ? 'about' : 'contacts'}`}
                    className="font-sans font-inter"
                  >
                    {t(`header.menu.${menuItem}`)}
                  </Link>
                </MenuItem>
              ))}
              <ul className="flex flex-row items-center justify-center py-[6px]">
                {langs.map((lang) => {
                  return (
                    <li key={lang.code} className={liClassName(lang)}>
                      <Link href={route} locale={lang.code}>
                        {lang.lang}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </Menu>
          </Box>
        </div>
      </ContentWrapper>
    </div>
  )
}
