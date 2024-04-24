import { PropsWithChildren } from 'react'
import { Header } from '../header/header'

export const Wrapper = (props: PropsWithChildren) => {
  return (
    <div className="mx-auto flex flex-col w-full items-center">
      <Header />
      {props.children}
    </div>
  )
}
