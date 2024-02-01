import { Suspense, useRef, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'
import { ScrollyText } from './ScrollyText'

export const SpotifyActivity = () => {
  const { data, error, isLoading } = useSWR(
    '/api/spotify',
    (...args) => fetch(...args).then((res) => res.json()),
    {
      refreshInterval: 120000,
    }
  )

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
                <ScrollyText
                  animationClassName='animate-marquee'
                  className='font-iamono font-bold'
                  text={data.song}
                  timePerChar={30}
                />
                <ScrollyText
                  animationClassName='animate-marquee'
                  className='font-iamono text-sm'
                  text={data.artist}
                  timePerChar={30}
                />
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
