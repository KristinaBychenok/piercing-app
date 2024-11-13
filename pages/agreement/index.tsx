import { ContentWrapper } from '../../components/layouts/contentWrapper'
import { Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { GetStaticPropsContext } from 'next'
import { Wrapper } from '@/components/layouts/wrapper'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Link from 'next/link'
import { Button } from '../../components/buttons/button'

const policyTopics = [
  { id: 'GeneralProvisions', subTopics: ['1', '2', '3', '4', '5'] },
  { id: 'PersonalDataProcessed', subTopics: ['1', '2', '3', '4'] },
  {
    id: 'PurposesOfDataProcessing',
    subTopics: ['1', ['2', '1', '2', '3'], '3'],
  },
  { id: 'LegalBasis', subTopics: [['1', '1', '2', '3'], '2'] },
  { id: 'SecurityPolicy', subTopics: ['1', '2', '3'] },
  { id: 'DataProcessingProcedures', subTopics: ['1', '2', '3', '4', '5', '6'] },
  { id: 'UserRights', subTopics: [['1', '1', '2', '3', '4', '5', '6'], '2'] },
  { id: 'FinalProvisions', subTopics: ['1', '2'] },
] as const

export default function Agreement() {
  const t = useTranslations()
  const router = useRouter()

  useEffect(() => {
    router.push(router.asPath, router.asPath, {
      locale: router.locale,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clickReturnHandler = () => {
    window.close()
    // window.location.href = 'http://localhost:3000'
  }
  const clickGoBookHandler = () => {
    window.close()
    // window.location.href = 'http://localhost:3000/#booking'
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <div className="flex flex-col w-full pt-16 mx-auto gap-12">
          <Link
            href={'/#'}
            onClick={clickReturnHandler}
            className="flex flex-row gap-4 text-white normal-case w-fit font-inter font-basic text-14 hover:text-yellow-light active:text-yellow-default bg-transparent hover:bg-transparent active:bg-transparent"
          >
            <ArrowBackIosNewIcon />
            <Typography>{t('policy.back')}</Typography>
          </Link>
          <div className="flex flex-col gap-10">
            <Typography
              variant="h1"
              className="font-inter font-basic"
              fontSize={56}
            >
              {t('policy.Title')}
            </Typography>
            <div>
              <Typography className="font-inter font-light" fontSize={17}>
                {t('policy.Intro1')}
              </Typography>
              <Typography className="font-inter font-light" fontSize={17}>
                {t('policy.Intro2')}
              </Typography>
            </div>
          </div>
          <ul className="flex flex-col gap-12">
            {policyTopics.map((topic, index) => {
              return (
                <li key={topic.id}>
                  <div className="flex flex-row mb-4">
                    <Typography
                      className="font-inter font-basic pr-4"
                      fontSize={28}
                    >
                      {index + 1}
                    </Typography>
                    <Typography className="font-inter font-basic" fontSize={28}>
                      {t(`policy.items.${topic.id}.title`)}
                    </Typography>
                  </div>
                  {topic.id === 'DataProcessingProcedures' && (
                    <Typography
                      className="font-inter font-light pr-4 mb-4"
                      fontSize={17}
                    >
                      {t(`policy.items.${topic.id}.subtitle`)}
                    </Typography>
                  )}
                  <ul className="flex flex-col gap-4">
                    {topic.subTopics.map((subTopic) => {
                      if (typeof subTopic === 'string') {
                        return (
                          <li
                            key={topic.id + '-' + subTopic}
                            className="flex flex-row"
                          >
                            <Typography
                              className="font-inter font-light pr-4"
                              fontSize={17}
                            >
                              {index + 1}.{subTopic}{' '}
                            </Typography>
                            <Typography
                              className="font-inter font-light"
                              fontSize={17}
                            >
                              {t(`policy.items.${topic.id}.${subTopic}`)}
                            </Typography>
                          </li>
                        )
                      } else {
                        return (
                          <li
                            key={topic.id + '-' + subTopic[0]}
                            className="flex flex-row"
                          >
                            <Typography
                              className="font-inter font-light pr-4"
                              fontSize={17}
                            >
                              {index + 1}.{subTopic[0]}
                            </Typography>
                            <div className="flex flex-col">
                              <Typography
                                className="font-inter font-light"
                                fontSize={17}
                              >
                                {t(
                                  `policy.items.${topic.id}.${subTopic[0]}.title`
                                )}
                              </Typography>
                              <ul className="flex flex-col gap-4 mt-4 ml-4 list-disc">
                                {subTopic.slice(1).map((subTopicItem) => (
                                  <li
                                    key={
                                      topic.id +
                                      '-' +
                                      subTopic[0] +
                                      '-' +
                                      subTopicItem
                                    }
                                  >
                                    <Typography
                                      className="font-inter font-light"
                                      fontSize={17}
                                    >
                                      {t(
                                        `policy.items.${topic.id}.${subTopic[0]}.${subTopicItem}`
                                      )}
                                    </Typography>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-row items-center justify-between mb-16 mt-12">
            <Link
              href={'/#'}
              onClick={clickReturnHandler}
              className="flex flex-row gap-4 text-white normal-case w-fit font-inter font-basic text-14 hover:text-yellow-light active:text-yellow-default bg-transparent hover:bg-transparent active:bg-transparent"
            >
              <ArrowBackIosNewIcon />
              <Typography>{t('policy.back')}</Typography>
            </Link>
            <Button
              name={t('main.button')}
              href="/#"
              onClick={clickGoBookHandler}
            />
          </div>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
    },
  }
}
