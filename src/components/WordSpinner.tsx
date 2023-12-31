import { useState } from 'react'

interface Item {
  value: string
  icon: ImageMetadata
}

interface WordSpinnerProps {
  items: Array<Item>
}

export const WordSpinner = (props: WordSpinnerProps) => {
  const { items } = props

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
    <div className='relative mb-0.5 inline-flex overflow-hidden align-middle'>
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
