import { twMerge } from 'tailwind-merge'

interface Props {
  type: 'email' | 'url'
  url: string
  value: string
  imgSrc: string
  className?: string
}

export const Social = (props: Props) => {
  const { type, url, value, imgSrc, className } = props

  return (
    <a
      href={type === 'email' ? `mailto:${atob(url)}` : atob(url)}
      target='_blank'
      title={value}
      rel='noopener noreferrer'
      className={twMerge(
        `block h-9 items-center transition-all hover:drop-shadow-primary`,
        className
      )}
    >
      <img src={imgSrc} className='h-full object-cover' />
    </a>
  )
}
