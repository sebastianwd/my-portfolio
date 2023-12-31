import React, { memo, useState, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface DelayProps {
  waitBeforeShow: number
  children: React.ReactNode
}

const Delay = (props: DelayProps) => {
  const { waitBeforeShow, children } = props

  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHidden(false)
    }, waitBeforeShow)

    return () => clearTimeout(timeout)
  }, [])

  return hidden ? null : <>{children}</>
}

interface WordAnimatorProps {
  delay?: number
  words: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  children?: React.ReactNode
}

interface CharacterProps {
  char: string
}

const Character = memo((props: CharacterProps) => {
  const { char } = props

  const [animationClasses, setAnimationClasses] = useState<string>(
    'animate__animated animate__bounceIn'
  )

  return (
    <span
      aria-hidden='true'
      className={animationClasses}
      onAnimationEnd={() => setAnimationClasses('')}
      onMouseEnter={() =>
        setAnimationClasses('animate__animated animate__rubberBand')
      }
    >
      {char}
    </span>
  )
})

export const WordAnimator = (props: WordAnimatorProps) => {
  const {
    delay = 60,
    words,
    tag: Tag = 'p',
    children,
    className,
    ...rest
  } = props

  return (
    <Tag
      className={twMerge('flex cursor-default select-none', className)}
      {...rest}
    >
      {words.split('').map((character, index) => {
        return (
          <Delay waitBeforeShow={index * delay} key={String(character + index)}>
            <Character char={character === ' ' ? `\u00A0` : character} />
          </Delay>
        )
      })}
      <span className='sr-only'>{words}</span>
    </Tag>
  )
}
