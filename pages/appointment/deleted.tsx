import { Header } from '../../components/header/header'
import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { Button } from '../../components/buttons/button'
import { Typography } from '@mui/material'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export default function Deleted() {
  const t = useTranslations()

  return (
    <>
      <Header />
      <ContentWrapper>
        <div className="mt-16">
          <Typography
            variant="h2"
            className="font-inter font-basic pb-8"
            fontSize={32}
          >
            {t('reschedule.successfullyCanceld')}
          </Typography>
          <Button name={t('reschedule.buttonReturn')} href="/" />
        </div>
      </ContentWrapper>
    </>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}
