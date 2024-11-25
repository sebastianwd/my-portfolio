import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useState } from 'react'

export const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
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
      className='relative size-full [align-items:inherit] [display:inherit] [justify-content:inherit]'
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className='absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white'
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  )
}
