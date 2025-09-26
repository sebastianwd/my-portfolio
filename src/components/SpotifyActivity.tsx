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
    <>
      {isLoading && (
        <div className='animate-pulse'>
          <div className='flex items-end gap-2 text-primary'>
            <div className='h-9 w-20 rounded bg-surface-600'></div>
            <div className='h-5 w-32 rounded bg-surface-600'></div>
            <div className='h-4 w-4 rounded bg-surface-600'></div>
          </div>
          <div className='mt-3 flex gap-3 md:flex-wrap lg:flex-nowrap'>
            <div className='h-20 w-20 rounded-md bg-surface-600 md:h-auto md:w-full lg:h-[72px] lg:w-20'></div>
            <div className='flex flex-1 flex-col gap-2'>
              <div className='h-4 w-3/4 rounded bg-surface-600'></div>
              <div className='h-3 w-1/2 rounded bg-surface-600'></div>
            </div>
          </div>
        </div>
      )}
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
                  className='font-iamono mb-0.5 text-sm font-bold'
                  text={String(data.song)}
                  timePerChar={30}
                />
                <ScrollyText
                  animationClassName='animate-marquee'
                  className='font-iamono text-xs'
                  text={String(data.artist)}
                  timePerChar={30}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
