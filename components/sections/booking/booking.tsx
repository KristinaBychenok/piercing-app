import { Typography } from '@mui/material'
import { Form } from '../../form/form'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'

export const Booking = () => {
  return (
    <div
      className="flex w-full relative pt-12 laptop:pt-32 overflow-x-hidden"
      id="booking"
    >
      <ContentWrapper>
        <div className="flex flex-row items-center justify-center w-full">
          <div className="hidden tablet:flex flex-col w-[297px] h-[970px] absolute tablet:-left-[249px] laptop:-left-20 desktop:static desktop:self-start top-12 laptop:top-32">
            <Image
              src={'/contacts-1.jpg'}
              alt="contacts-1-image"
              width={297}
              height={770}
              className="overflow-auto h-[770px] object-cover"
              priority={false}
            />
            <Typography className="invisible laptop:visible laptop:flex font-inter font-basic text-48 desktop:text-56 text-grey-strong text-end pt-8 leading-tight">
              Enhance Style
            </Typography>
          </div>
          <Form />
          <div className="hidden tablet:flex flex-col w-[297px] h-[970px] absolute tablet:-right-[249px] laptop:-right-20 desktop:static desktop:self-end bottom-0">
            <Typography className="invisible laptop:visible laptop:flex font-inter font-basic text-48 desktop:text-56 text-grey-strong text-start w-[249px] pb-8 leading-tight">
              Get Pierced
            </Typography>
            <Image
              src={'/contacts-2.jpg'}
              alt="contacts-2-image"
              width={297}
              height={770}
              className="overflow-auto h-[770px] object-cover"
              priority={false}
            />
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
