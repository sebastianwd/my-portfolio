import Spline from '@splinetool/react-spline'
import { Suspense } from 'react'

interface Props {
  sceneUrl: string
  className?: string
}

export const SplineRender = (props: Props) => {
  return (
    <Suspense>
      <Spline
        className='animate__fadeIn animate__animated bg-transparent [&>canvas]:bg-transparent'
        scene={props.sceneUrl}
      />
    </Suspense>
  )
}
