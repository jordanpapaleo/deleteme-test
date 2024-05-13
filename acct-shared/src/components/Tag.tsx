// eslint-disable-next-line no-use-before-define
import * as React from 'react'

type PropT = {
  children: React.ReactNode
}

export default function Tag({ children }: PropT) {
  return <div>{children}</div>
}
