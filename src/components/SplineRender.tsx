import Spline from '@splinetool/react-spline'

interface Props {
  sceneUrl: string
  className?: string
}

export const SplineRender = (props: Props) => {
  return <Spline className={props.className} scene={props.sceneUrl} />
}
