import { type MotionValue, useMotionValue, useVelocity } from 'motion/react'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useEvent } from 'react-use'

type MouseType = {
  position: {
    x: MotionValue<number>
    y: MotionValue<number>
  }
  velocity: {
    x: MotionValue<number>
    y: MotionValue<number>
  }
}

const useMousePosition = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEvent('mousemove', (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  })

  return useMemo(() => ({ x, y }), [x, y])
}

const MouseContext = createContext<MouseType | null>(null)

export const useMouse = () => {
  if (!MouseContext) {
    throw new Error('useMouse must be used within a MouseProvider')
  }

  return useContext(MouseContext)
}

export const MouseProvider = ({ children }: { children: ReactNode }) => {
  const { x, y } = useMousePosition()
  const velocityX = useVelocity(x)
  const velocityY = useVelocity(y)

  const mouse = useMemo(
    () => ({
      position: { x, y },
      velocity: { x: velocityX, y: velocityY },
    }),
    [x, y, velocityX, velocityY]
  )

  return <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
}
