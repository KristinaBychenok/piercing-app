import { PropsWithChildren } from 'react'
import { Header } from '../header/header'
import Head from 'next/head'
import React from 'react'

export const Wrapper = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Daryauo piercing</title>
        <meta name="description" content="App with your recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="mx-auto flex flex-col w-full items-center">
        <Header />
        {props.children}
      </div>
    </>
  )
}
