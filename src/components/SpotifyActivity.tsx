import { Suspense, useRef, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'

export const SpotifyActivity = () => {
  const { data, error, isLoading } = useSWR(
    '/api/spotify',
    (...args) => fetch(...args).then((res) => res.json()),
    {
      refreshInterval: 120000,
    }
  )

  const scrollTextRef = useRef<HTMLParagraphElement>(null)

  const [animationDuration, setAnimationDuration] = useState<string>()
  const [animationEnablerClass, setAnimationEnablerClass] = useState<
    'animate-marquee' | 'overflow-clip'
  >('overflow-clip')
  // prevents the animation from pausing the first time it's hovered
  const [timesHovered, setTimesHovered] = useState(0)

  const onMouseEnter = () => {
    if (!scrollTextRef.current) {
      return
    }

    setTimesHovered((prev) => prev + 1)
    if (animationEnablerClass === 'animate-marquee') {
      return
    }

    const totalTextWidth = scrollTextRef.current.scrollWidth
    const visibleTextWidth = scrollTextRef.current.offsetWidth

    const isOverflowing = totalTextWidth > visibleTextWidth
    if (!isOverflowing) {
      document.documentElement.style.setProperty('--marquee-x', `0px`)
      return
    }

    const BASE_TIME = 25
    const OFFSET = 10

    const distance = totalTextWidth - visibleTextWidth + OFFSET
    const duration = BASE_TIME * distance

    document.documentElement.style.setProperty(
      '--marquee-x',
      `${-distance - OFFSET}px`
    )

    setAnimationDuration(`${duration}ms`)
    setAnimationEnablerClass('animate-marquee')
  }

  const isAnimating = animationEnablerClass === 'animate-marquee'

  return (
    <Suspense>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <>
          <div className='absolute w-full' />
          <div className='flex gap-3 md:flex-wrap lg:flex-nowrap'>
            <div className='mr-auto flex min-w-0 flex-col'>
              <h2 className='mb-1 font-clvtc text-2xl text-primary'>
                {data.isPlaying ? "I'm listening to:" : 'Recently played:'}
              </h2>
              <div className='mt-auto'>
                <div
                  className='group overflow-clip'
                  onMouseEnter={onMouseEnter}
                >
                  <p
                    title={data.song}
                    className={twMerge(
                      `max-w-full text-ellipsis whitespace-nowrap font-iamono font-bold group-hover:overflow-visible`,
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
                    {data.song}
                  </p>
                </div>
                <p
                  title={data.artist}
                  className='max-w-full truncate font-iamono text-sm '
                >
                  {data.artist}
                </p>
              </div>
            </div>
            <img
              className='h-20 w-auto min-w-0 shrink-0 rounded-md md:h-auto md:w-full lg:h-20 lg:w-auto'
              src={data.coverImg}
            />
          </div>
        </>
      )}
    </Suspense>
  )
}
