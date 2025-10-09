import { Suspense } from 'react'
import useSWR from 'swr'

export const PageViews = () => {
  const { data, error, isLoading } = useSWR(
    '/api/page-view?' +
      new URLSearchParams({
        slug: '/',
      }),
    (...args) => fetch(...args).then((res) => res.json())
  )

  return (
    <>
      {isLoading && (
        <div className='animate-pulse'>
          <div className='mb-2 h-6 w-16 rounded bg-surface-600'></div>
          <div className='flex'>
            <div className='mb-1 h-4 w-8 rounded bg-surface-600'></div>
            <div className='ml-auto h-4 w-12 rounded bg-surface-600'></div>
          </div>
          <div className='flex'>
            <div className='h-4 w-10 rounded bg-surface-600'></div>
            <div className='ml-auto h-4 w-12 rounded bg-surface-600'></div>
          </div>
        </div>
      )}
      {error && <div>Error: {String(error)}</div>}
      {data && (
        <div className='flex flex-col'>
          <h2 className='mb-1 font-clvtc text-xl text-primary'>Visits</h2>
          <p className='flex font-primary'>
            Total:{' '}
            <span className='relative ml-auto font-mono'>
              <span className='absolute right-0 text-surface-200'>000000</span>
              <span className='relative z-10 bg-surface-700'>
                {String(data.total).padStart(6, '0')}
              </span>
            </span>
          </p>
          <p className='flex font-primary'>
            Unique:{' '}
            <span className='relative ml-auto font-mono'>
              <span className='absolute right-0 text-surface-200'>000000</span>
              <span className='relative z-10 bg-surface-700'>
                {String(data.unique).padStart(6, '0')}
              </span>
            </span>
          </p>
        </div>
      )}
    </>
  )
}
