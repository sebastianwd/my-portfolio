import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import homeIcon from '../../assets/home.svg?raw'
import devtoolIcon from '../../assets/devtool.svg?raw'
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'motion/react'
import { MouseProvider, useMouse } from './MouseProvider'
import { Tooltip } from '../Tooltip'
import { twMerge } from 'tailwind-merge'

const DockItem = ({
  icon,
  href,
  index,
  total,
  title,
  currentPath,
}: {
  icon: React.ReactElement
  href: string
  index: number
  total: number
  title: string
  currentPath: string
}) => {
  const mouse = useMouse()

  const dock = useContext(DockContext)
  if (!mouse) {
    throw new Error('MouseProvider not found')
  }

  const dimension = useTransform(mouse?.position.x, (mouseX) => {
    if (!dock?.isHovered) {
      return 48
    }

    const rangeStart = dock?.dock?.getBoundingClientRect()?.left ?? 0
    const dockWidth = dock?.dock?.clientWidth ?? 1

    // 0-1 range
    const normalizedMouseX = (mouseX - rangeStart) / dockWidth

    // Calculate normalized position of the current item's center
    const itemCenterX = (index + 0.5) * (1 / total)

    // Calculate the difference between mouse position and item center
    const distanceFromCenter = Math.abs(normalizedMouseX - itemCenterX)

    // Maximum extra scaling amount
    const scalingMagnitude = 0.6
    // How quickly the scale decreases according to distance
    const distanceSensitivity = 3

    const scaleFactor = Math.max(
      1,
      1 + scalingMagnitude * (1 - distanceFromCenter * distanceSensitivity)
    )

    // Apply scale factor to the base size (48)
    return 48 * scaleFactor
  })

  const spring = useSpring(48, {
    damping: 10,
    stiffness: 150,
    mass: 0.01,
  })

  useMotionValueEvent(dimension, 'change', (latest) => {
    if (dock?.isHovered) {
      spring.set(latest)
    } else {
      spring.set(48)
    }
  })

  const controls = useAnimationControls()

  return (
    <motion.a
      className={twMerge(
        'relative flex cursor-pointer items-center justify-center rounded-lg text-stone-400 shadow-[0_-1px_hsl(0_0%_0%/0.5)_inset,0_2px_4px_hsl(0_0%_0%_/_0.5),0_1px_hsl(0_0%_100%/0.5)_inset] transition-colors [background:linear-gradient(hsl(0_0%_100%/0.15),#0000),hsl(0_0%_4%)] hover:text-stone-300',
        currentPath === href
          ? "after:absolute after:-bottom-3 after:text-xs after:content-['•']"
          : ''
      )}
      href={href}
      style={{
        width: spring,
        height: spring,
      }}
      variants={{
        initial: {
          y: 0,
        },
        bounce: {
          y: [0, -40, 0],
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
      }}
      initial='initial'
      animate={controls}
      onClick={() => {
        controls.start('bounce')
      }}
    >
      <Tooltip text={title}>
        {cloneElement(
          icon as React.ReactElement<React.SVGProps<SVGSVGElement>>,
          {
            className: 'transition-colors size-3/5',
          }
        )}
      </Tooltip>
    </motion.a>
  )
}

type DockContext = {
  isHovered: boolean
  dock: HTMLDivElement | null
}

const DockContext = createContext<DockContext | null>(null)

const dockItems = [
  {
    icon: <span dangerouslySetInnerHTML={{ __html: homeIcon }} />,
    href: '/',
    title: 'Home',
  },
  {
    icon: <span dangerouslySetInnerHTML={{ __html: devtoolIcon }} />,
    href: '/projects',
    title: 'Projects',
  },
]

interface DockProps {
  currentPath: string
}

export const Dock = (props: DockProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const [isHovered, setIsHovered] = useState(false)

  const [dock, setDock] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setDock(ref.current)
  }, [])

  return (
    <MouseProvider>
      <DockContext.Provider value={{ isHovered, dock }}>
        <footer className='fixed -bottom-3 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
          <motion.div
            className='box-content flex h-12 items-end justify-center gap-4 rounded-xl border border-solid border-zinc-700 bg-neutral-800/60 px-4 py-1.5 backdrop-blur-sm'
            onHoverStart={() => {
              setIsHovered(true)
            }}
            onHoverEnd={() => {
              setIsHovered(false)
            }}
            ref={ref}
          >
            {dockItems.map((item, index) => (
              <DockItem
                key={index}
                {...item}
                title={item.title}
                index={index}
                total={dockItems.length}
                currentPath={props.currentPath}
              />
            ))}
          </motion.div>
        </footer>
      </DockContext.Provider>
    </MouseProvider>
  )
}
