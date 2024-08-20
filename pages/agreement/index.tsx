import Link from 'next/link'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { Typography } from '@mui/material'
import { Logo } from '../../components/logo/logo'

export default function Agreement() {
  return (
    <div className="flex flex-col w-full h-fit">
      <div className={`flex w-full h-[1px] bg-white absolute top-[93px]`}></div>
      <ContentWrapper>
        <div className="flex flex-col">
          <Link href={'/'} className="text-2xl my-[14px] font-sans font-inter">
            <Logo />
          </Link>
          <Typography
            variant="h2"
            className="font-inter font-basic pb-8 mt-6"
            fontSize={32}
          >
            Hello!
          </Typography>
        </div>
      </ContentWrapper>
    </div>
  )
}
