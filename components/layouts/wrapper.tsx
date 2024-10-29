import { PropsWithChildren, memo } from 'react'
import { Header } from '../header/header'
import Head from 'next/head'
import React from 'react'
import { Inter } from 'next/font/google'
import { Footer } from '../footer/footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '400', '500', '700', '900'],
  variable: '--font-inter',
})

export const Wrapper = memo(function WrapperComponent(
  props: PropsWithChildren
) {
  return (
    <>
      <Head>
        <title>Daryauo piercing</title>
        <meta name="description" content="App with your recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div
        className={`mx-auto flex flex-col min-h-screen w-full ${inter.variable}`}
      >
        <Header />
        <div className="flex flex-col w-full h-fit mt-[93px]">
          {props.children}
        </div>
        <Footer />
      </div>
    </>
  )
})
