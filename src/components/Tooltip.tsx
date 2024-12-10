import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Tooltip = ({
  text,
  icon,
  children,
  className,
}: {
  text: string
  icon?: any
  children?: React.ReactNode
  className?: string
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => {
        setHovered(true)
      }}
      onHoverEnd={() => {
        setHovered(false)
      }}
      className={twMerge(
        'relative size-full [align-items:inherit] [display:flex] [justify-content:inherit]',
        className
      )}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className='absolute -top-10 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-xl border border-gray-200 bg-gray-100 px-3 py-1.5 text-sm text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white'
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      {icon || children}
    </motion.div>
  )
}
