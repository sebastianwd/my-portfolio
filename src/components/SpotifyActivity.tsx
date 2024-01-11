import { Suspense } from 'react'
import useSWR from 'swr'

export const SpotifyActivity = () => {
  const { data, error, isLoading } = useSWR(
    '/api/spotify',
    (...args) => fetch(...args).then((res) => res.json()),
    {
      refreshInterval: 60000,
    }
  )

  return (
    <Suspense>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && (
        <div className='flex gap-3 md:flex-wrap lg:flex-nowrap'>
          <div className='mr-auto flex min-w-0 flex-col'>
            <h2 className='mb-1 font-clvtc text-2xl text-primary'>
              {data.isPlaying ? "I'm listening to:" : 'Recently played:'}
            </h2>
            <div className='mt-auto'>
              <p
                title={data.song}
                className='max-w-full truncate font-iamono font-bold'
              >
                {data.song}
              </p>
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
      )}
    </Suspense>
  )
}
