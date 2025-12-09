import { Button } from '@/components/buttons/button'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { RootState } from '@/store/store'
import { addService, addServiceType } from '@/components/form/form.slice'
import { servicesImages } from '@/data/servicesImages'

type Props = {
  imageLinks: string[]
  category: {
    title: string
    services: string[]
  }
  selectedService: string
}

export const ServiceContent = ({ category, selectedService }: Props) => {
  const t = useTranslations()
  const dispatch = useDispatch()
  const loadedData = useSelector((state: RootState) => state.loadedData)

  const presettBookingInfo = (serviceType: string, service: string) => {
    dispatch(addServiceType(serviceType))
    dispatch(addService(service))
  }

  const count = servicesImages[category.title]?.[selectedService] ?? 0

  const imageLinks = Array.from(
    { length: count },
    (_, i) =>
      `/portfolio/services/${selectedService}-piercing-daryauo-${i + 1}.webp`
  )

  return (
    <div className="flex flex-col w-full laptop:flex-row gap-8 desktop:gap-10 justify-between">
      <div className="flex flex-col gap-7 w-full laptop:w-[798px] desktop:w-[964px] desktopM:w-[1180px] desktopL:w-[1612px]">
        <div className="flex flex-col tablet:flex-row gap-5 desktop:gap-24 justify-between">
          <div className="flex flex-col gap-5">
            <Typography
              className="font-sans font-inter text-14 font-bold"
              fontSize={14}
            >
              {`${t(`services.${category.title}.${selectedService}`)}* - ${t(
                `services.${category.title}.${selectedService}Description`
              )}`}
            </Typography>
            <Typography
              className="font-sans font-inter text-10 font-light"
              fontSize={10}
            >
              {t('services.warning')}
            </Typography>
          </div>
          <div className="flex flex-row h-fit w-fit">
            <Typography className="px-0 tablet:px-3 laptop:px-5 border-r w-[66px] tablet:w-[80px] laptop:w-[120px] text-left tablet:text-right">
              {`${
                loadedData.services.find((i) => i.name === selectedService)
                  ?.amt_time
              } min`}
            </Typography>
            <Typography className="px-0 tablet:px-3 laptop:px-5 border-l w-[56px] tablet:w-[80px] laptop:w-[120px] text-right tablet:text-left">
              {`${
                loadedData.services.find((i) => i.name === selectedService)
                  ?.cost
              } zl`}
            </Typography>
          </div>
        </div>
        <div className="w-full overflow-x-auto scrollbar">
          <div className="flex flex-row gap-4 w-max">
            {imageLinks.map((link, index) => (
              <div
                key={link}
                className="flex w-[200px] h-[200px] z-0 justify-start"
              >
                <Image
                  src={link}
                  alt={t(
                    `services.${category.title}.${selectedService}Alt${
                      index + 1
                    }`
                  )}
                  width={200}
                  height={200}
                  priority={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-start laptop:justify-end items-start">
        <div className="flex w-[186px] z-0 justify-start">
          <Image src="/dog.png" alt="dog" width={186} height={215} />
        </div>
        <div className="flex w-[186px] h-12 z-0 justify-start">
          <Button
            name={t('main.button')}
            href="/#booking"
            onClick={() => presettBookingInfo(category.title, selectedService)}
          />
        </div>
      </div>
    </div>
  )
}
