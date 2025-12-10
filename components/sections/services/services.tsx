import { ContentWrapper } from '@/components/layouts/contentWrapper'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { BreadcrumbsMenu } from './components/breadcrumbsMenu'
import { ServiceContent } from './components/serviceContent'

const imageLinks = [
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
  '/contacts.jpg',
]

const categories = [
  {
    title: 'ears',
    services: [
      'lobe',
      'upper_lobe',
      'helix',
      'conch',
      'industrial',
      'tragus',
      'rook',
      'daith',
      'snug',
      'antitragus',
      'flat',
    ],
  },
  {
    title: 'nose',
    services: ['septum', 'nostril', 'bridge'],
  },
  {
    title: 'eyebrow',
    services: ['eyebrow'],
  },
  {
    title: 'navel',
    services: ['navel'],
  },
  {
    title: 'lips_mouth',
    services: [
      'labret',
      'vertical_labret',
      'medusa',
      'angel_fangs',
      'snake_bites',
    ],
  },
  {
    title: '18+',
    services: ['standart', 'double'],
  },
  {
    title: 'surf_dermal',
    services: ['surface', 'microdermal'],
  },
  {
    title: 'other',
    services: ['consultation', 'downsize', 'changing_jewelry'],
  },
]

export const Services = () => {
  const t = useTranslations()

  const [selectedService, setSelectedService] = useState('lobe')
  const [expanded, setExpanded] = useState('')

  const handleClickService = (service: string) => {
    setSelectedService(service)
  }

  const handleExpandAccordion =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : '')
      setSelectedService(
        categories.find((category) => category.title === panel)?.services[0] ||
          ''
      )
    }

  return (
    <ContentWrapper>
      <div
        id="services"
        className="flex flex-col items-center w-full justify-center pt-32"
      >
        <div className="flex w-full flex-row justify-between">
          <div className="flex flex-col gap-5">
            <Typography
              className="font-sans font-inter text-56 font-basic pb-8"
              fontSize={32}
            >
              {t('services.title')}
            </Typography>
            <div>
              <Typography
                className="font-sans font-inter text-17 font-light pb-4"
                fontSize={17}
              >
                {t('services.subtitle1')}
              </Typography>
              <Typography
                className="font-sans font-inter text-17 font-light pb-4"
                fontSize={17}
              >
                {t('services.subtitle2')}
              </Typography>
              <Typography
                className="font-sans font-inter text-17 font-light"
                fontSize={17}
              >
                {t('services.subtitle3')}
              </Typography>
            </div>
          </div>
          <div className="hidden laptop:flex w-[520px] h-[204px] desktop:h-[280px] justify-start ml-5">
            <Image src="/dog.png" alt="dog" width={280} height={280} />
          </div>
        </div>
        <div className="flex w-full flex-col pt-3">
          {categories.map((category) => {
            return (
              <Accordion
                key={category.title}
                expanded={expanded === category.title}
                onChange={handleExpandAccordion(category.title)}
                className="bg-grey-default w-full"
              >
                <AccordionSummary className="px-0">
                  <Typography component="span" color="white">
                    {t(`services.${category.title}.title`)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="text-white border-white px-0 flex w-full">
                  <div className="flex flex-col gap-10 w-full">
                    <BreadcrumbsMenu
                      category={category}
                      selectedService={selectedService}
                      handleClickService={handleClickService}
                    />
                    <ServiceContent
                      imageLinks={imageLinks}
                      category={category}
                      selectedService={selectedService}
                    />
                  </div>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </div>
      </div>
    </ContentWrapper>
  )
}
