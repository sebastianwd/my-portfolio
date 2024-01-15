import { geolocation } from '@vercel/edge'
import { Redis } from '@upstash/redis'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
})

export const POST: APIRoute = async ({ request }) => {
  const date = new Date()
  const { slug } = await new Response(request.body).json()

  const { flag, country, city, latitude, longitude } = geolocation(request)

  if (!(flag && country && city && latitude && longitude && slug)) {
    return Response.json({ message: 'Missing required parameters' })
  } else {
    const uniqueViewsKey = [
      country,
      city.replace(/[^a-zA-Z ]/g, ' '),
      latitude,
      longitude,
      slug,
    ].join(':')

    const totalViewsKey = [
      dayjs(date).format('MM/DD/YYYY'),
      ...uniqueViewsKey,
    ].join(':')

    await redis.sadd('portfolio-unique', uniqueViewsKey)

    // Deduplicate views, so that a single user can't increment the view count before the TTL expires
    const isNew = await redis.set(
      ['deduplicate', totalViewsKey].join(':'),
      true,
      {
        nx: true,
        ex: 60 * 60 * 6,
      }
    )

    if (!isNew) {
      return Response.json({ message: 'Ok!' })
    }

    await redis.incr(['portfolio-total', slug].join(':'))

    return Response.json({ message: 'Ok!' })
  }
}

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const total = await redis.get(
    ['portfolio-total', searchParams.get('slug')].join(':')
  )
  const unique = await redis.scard('portfolio-unique')

  return Response.json(
    {
      total: total ? parseInt(total as string) : 0,
      unique: unique ? unique : 0,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=21600',
      },
    }
  )
}

export const config = {
  runtime: 'edge',
}
