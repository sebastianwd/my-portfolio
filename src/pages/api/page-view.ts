import { geolocation } from '@vercel/edge'
import { Redis } from '@upstash/redis'
import type { APIRoute } from 'astro'
import dayjs from 'dayjs'

const redis = Redis.fromEnv()

export const POST: APIRoute = async ({ params, request }) => {
  const date = new Date()
  const { slug } = await new Response(request.body).json()

  const { flag, country, city, latitude, longitude } = geolocation(request)

  if (!(flag && country && city && latitude && longitude && slug)) {
    return Response.json({ message: 'Missing required parameters' })
  } else {
    const uniqueViewsKey = [
      dayjs(date).format('L'),
      country,
      city.replace(/[^a-zA-Z ]/g, ' '),
      latitude,
      longitude,
    ].join(':')

    await redis.sadd('portfolio-unique', uniqueViewsKey)

    // Deduplicate views, so that a single user can't increment the view count before the TTL expires
    const isNew = await redis.set(
      ['deduplicate', uniqueViewsKey].join(':'),
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

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params
  const total = await redis.get(['portfolio-total', slug].join(':'))

  return Response.json({
    total: total ? parseInt(total as string) : 0,
  })
}

export const config = {
  runtime: 'edge',
}
