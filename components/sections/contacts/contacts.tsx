import { Form } from '../../form/form'
import { ContentWrapper } from '../../layouts/contentWrapper'
import Image from 'next/image'

export const Contacts = () => {
  return (
    <ContentWrapper>
      <div
        id="contacts"
        className="flex flex-col desktop:flex-row items-center py-6 laptop:py-16 w-full"
      >
        <Form />
        <Image
          src={'/contacts.webp'}
          alt="contacts-image"
          width={873}
          height={850}
          className="w-full desktop:w-auto desktop:h-[850px] overflow-auto"
          priority={false}
        />
      </div>
    </ContentWrapper>
  )
}
