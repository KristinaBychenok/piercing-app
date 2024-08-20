import Link from 'next/link'
import { memo, useCallback } from 'react'

export const Button = memo(function BookNowButtonComponent({
  name,
  href,
  onClick,
}: {
  name: string
  href: string
  onClick?: () => void
}) {
  const onClickHandler = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Link href={href} className="button w-fit" onClick={onClickHandler}>
      {name}
    </Link>
  )
})
