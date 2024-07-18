import Link from 'next/link'
import { memo } from 'react'

export const Button = memo(function BookNowButtonComponent({
  name,
  href,
}: {
  name: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="border border-white border-solid py-3 px-14 text-center h-fit w-fit"
    >
      {name}
    </Link>
  )
})
