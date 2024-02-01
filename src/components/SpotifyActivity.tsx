import { Suspense, useRef, useState } from 'react'
import useSWR from 'swr'

export const SpotifyActivity = () => {
  const { data, error, isLoading } = useSWR(
    '/api/spotify',
    (...args) => fetch(...args).then((res) => res.json()),
    {
      refreshInterval: 120000,
    }
  )

  const scrollTextRef = useRef<HTMLParagraphElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [animationDuration, setAnimationDuration] = useState<string>()

  const onMouseEnter = () => {
    if (!scrollTextRef.current || !containerRef.current) {
      return
    }
    const totalTextWidth = scrollTextRef.current.scrollWidth
    const visibleTextWidth = scrollTextRef.current.offsetWidth

    console.log(
      'messageWidth',
      totalTextWidth,
      containerRef.current.offsetWidth
    )

    if (!(totalTextWidth > scrollTextRef.current.offsetWidth)) {
      document.documentElement.style.setProperty('--marquee-x', `0px`)
      return
    }

    const distance = totalTextWidth + containerRef.current.offsetWidth
    const duration = 4 * distance

    document.documentElement.style.setProperty(
      '--marquee-x',
      `${-(totalTextWidth - visibleTextWidth) - 20}px`
    )

    setAnimationDuration(`${duration}ms`)
  }

  return (
    <Suspense>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <>
          <div className='absolute w-full' ref={containerRef} />
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
                    className='max-w-full overflow-clip text-ellipsis whitespace-nowrap font-iamono font-bold group-hover:animate-marquee group-hover:overflow-visible'
                    style={{
                      animationDuration: animationDuration,
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
