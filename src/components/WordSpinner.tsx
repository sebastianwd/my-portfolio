import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import reactIcon from '../assets/react-icon.svg'
import graphqlIcon from '../assets/graphql-icon.svg'
import nodejsIcon from '../assets/nodejs-icon.svg'
import sqlIcon from '../assets/sql-icon.svg'

interface WordSpinnerProps {
  className?: string
}

const items = [
  {
    value: 'React',
    icon: reactIcon,
  },
  {
    value: 'GraphQL',
    icon: graphqlIcon,
  },
  {
    value: 'NodeJS',
    icon: nodejsIcon,
  },
  {
    value: 'SQL',
    icon: sqlIcon,
  },
]

export const WordSpinner = (props: WordSpinnerProps) => {
  const { className } = props

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
