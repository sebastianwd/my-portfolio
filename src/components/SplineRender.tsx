import Spline from '@splinetool/react-spline'
import { Delay } from './WordAnimator'
import { Suspense } from 'react'

interface Props {
  sceneUrl: string
  className?: string
}

export const SplineRender = (props: Props) => {
  return (
    <Suspense>
      <Spline className={props.className} scene={props.sceneUrl} />
    </Suspense>
  )
}
