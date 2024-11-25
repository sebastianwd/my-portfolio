import { Suspense, useRef, useState } from 'react'
import useSWR from 'swr'
import { twMerge } from 'tailwind-merge'
import { ScrollyText } from './ScrollyText'
import spotifyIcon from '../assets/spotify.svg'
import { WaveIcon } from './icons/WaveIcon'

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
      {error && <div>Error: {String(error)}</div>}
      {data && (
        <>
          <div className='flex items-end gap-2 text-primary'>
            <img src={spotifyIcon.src} className='h-9 w-fit object-cover' />
            <h2 className='mr-auto font-clvtc text-xl leading-none text-primary'>
              {data.isPlaying ? "I'm listening to:" : 'Recently played:'}
            </h2>
            <WaveIcon className='h-4 shrink-0' />
          </div>
          <div className='flex gap-3 md:flex-wrap lg:flex-nowrap'>
            <img
              className='h-20 w-auto min-w-0 shrink-0 rounded-md border border-solid border-zinc-800 md:h-auto md:w-full lg:h-[72px] lg:w-auto'
              src={String(data.coverImg)}
            />
            <div className='mr-auto flex min-w-0 flex-col'>
              <div className='my-auto'>
                <ScrollyText
                  animationClassName='animate-marquee'
                  className='font-iamono text-sm font-bold'
                  text={String(data.song)}
                  timePerChar={30}
                />
                <ScrollyText
                  animationClassName='animate-marquee'
                  className='font-iamono text-sm'
                  text={String(data.artist)}
                  timePerChar={30}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </Suspense>
  )
}
