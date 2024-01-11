import { geolocation } from '@vercel/edge'
import { Redis } from '@upstash/redis'
import type { APIRoute } from 'astro'

const redis = Redis.fromEnv()

export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = await new Response(request.body).json()

  const { flag, country, city, latitude, longitude } = geolocation(request)

  if (!(flag && country && city && latitude && longitude && slug)) {
    return Response.json({ message: 'Missing required parameters' })
  } else {
    const uniqueViewsKey = [
      'portfolio',
      'unique-views',
      country,
      city.replace(/[^a-zA-Z ]/g, ' '),
      longitude,
      latitude,
      slug,
    ].join(':')

    await redis.set(uniqueViewsKey, true, {
      nx: true,
    })

    // Deduplicate views, so that a single user can't increment the view count before the TTL expires
    const isNew = await redis.set(
      ['deduplicate', uniqueViewsKey].join(''),
      true,
      {
        nx: true,
        ex: 60 * 60 * 6,
      }
    )

    if (!isNew) {
      return Response.json({ message: 'ok' })
    }

    await redis.incr(['portfolio', 'total-views', slug].join(':'))

    return Response.json({ message: 'ok' })
  }
}

export const config = {
  runtime: 'edge',
}
