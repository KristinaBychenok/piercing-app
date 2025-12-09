import { Breadcrumbs, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'

type Props = {
  category: {
    title: string
    services: string[]
  }
  selectedService: string
  handleClickService: (service: string) => void
}

export const BreadcrumbsMenu = ({
  category,
  selectedService,
  handleClickService,
}: Props) => {
  const t = useTranslations()
  return (
    <div className="w-full overflow-x-auto scrollbar">
      <Breadcrumbs
        maxItems={11}
        separator={''}
        className="flex-nowrap whitespace-nowrap flex w-max"
      >
        {category.services.map((item) => {
          return (
            <Typography
              key={item}
              onClick={() => handleClickService(item)}
              className={`cursor-pointer py-[10px] desktop:px-4 laptop:px-2 ${
                selectedService === item ? 'border-b border-yellow-light' : ''
              } text-white hover:text-yellow-light active:text-yellow-default`}
            >
              {t(`services.${category.title}.${item}`)}
            </Typography>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
