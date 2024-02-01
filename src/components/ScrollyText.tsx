import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface ScrollyTextProps {
  animationClassName: string
  text: string
  className?: string
  timePerChar?: number
}

export const ScrollyText = (props: ScrollyTextProps) => {
  const { animationClassName, text, className, timePerChar } = props

  const [animationDuration, setAnimationDuration] = useState<string>()
  const [animationEnablerClass, setAnimationEnablerClass] =
    useState<string>('overflow-clip')
  const [timesHovered, setTimesHovered] = useState(0)

  const scrollTextRef = useRef<HTMLParagraphElement>(null)

  const onMouseEnter = () => {
    if (!scrollTextRef.current) {
      return
    }

    if (timesHovered <= 1) {
      setTimesHovered((prev) => prev + 1)
    }
    if (animationEnablerClass === animationClassName) {
      return
    }

    const totalTextWidth = scrollTextRef.current.scrollWidth
    const visibleTextWidth = scrollTextRef.current.offsetWidth

    const isOverflowing = totalTextWidth > visibleTextWidth
    if (!isOverflowing) {
      document.documentElement.style.setProperty('--marquee-x', `0px`)
      return
    }

    const BASE_TIME = timePerChar ?? 25
    const OFFSET = 10

    const distance = totalTextWidth - visibleTextWidth + OFFSET
    const duration = BASE_TIME * distance

    scrollTextRef.current.style.setProperty('--marquee-x', `${-distance}px`)

    setAnimationDuration(`${duration}ms`)
    setAnimationEnablerClass(animationClassName)
  }

  const isAnimating = animationEnablerClass === animationClassName

  return (
    <div
      className={twMerge(
        'group -ml-1.5 -mr-1.5 overflow-clip',
        isAnimating &&
          '[mask-image:linear-gradient(90deg,transparent_0,#000_6px,#000_calc(100%-12px),transparent)]'
      )}
      onMouseEnter={onMouseEnter}
    >
      <p
        className={twMerge(
          `max-w-full text-ellipsis whitespace-nowrap px-1.5 group-hover:overflow-visible`,
          className,
          animationEnablerClass,
          isAnimating &&
            timesHovered > 1 &&
            'group-hover:[animation-play-state:paused]'
        )}
        onAnimationEnd={() => {
          setAnimationEnablerClass('overflow-clip')
          setTimesHovered(0)
        }}
        style={{
          animationDuration: animationDuration,
          animationIterationCount: 2,
        }}
        ref={scrollTextRef}
      >
        {text}
      </p>
    </div>
  )
}
