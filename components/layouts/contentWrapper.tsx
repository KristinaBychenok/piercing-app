import { PropsWithChildren, memo } from 'react'

export const ContentWrapper = memo(function ContentWrapperComponent(
  props: PropsWithChildren
) {
  return <div className="flex px-4 tablet:px-12 w-full">{props.children}</div>
})
