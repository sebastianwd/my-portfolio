import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Item {
  value: string
  icon: ImageMetadata
}

interface WordSpinnerProps {
  items: Array<Item>
  className?: string
}

export const WordSpinner = (props: WordSpinnerProps) => {
  const { items, className } = props

  const [active, setActive] = useState(0)

  const { icon, value } = items[active]

  const animateNext = () => {
    if (items.length - 1 < active + 1) {
      setActive(0)

      return
    }

    setActive(active + 1)
  }

  return (
    <div
      className={twMerge(
        'relative mb-0.5 inline-flex overflow-hidden align-middle',
        className
      )}
    >
      <div
        className='flex animate-swipeUp items-center'
        onAnimationIteration={animateNext}
      >
        {icon && (
          <img className='mr-1 h-6 object-contain' src={icon.src} alt='' />
        )}
        <span>{value}</span>
      </div>
    </div>
  )
}
