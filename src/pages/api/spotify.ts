import type { APIRoute } from 'astro'
import * as cheerio from 'cheerio'

function extractSpotifyData(html: string) {
  const $ = cheerio.load(html)
  const artist = $('.artist').text()
  const song = $('.song').text()
  const coverImg = $('.cover').attr('src')
  const playing = $('.playing').text()

  return {
    artist,
    song,
    coverImg,
    isPlaying: playing.includes('Now playing on') ? true : false,
  }
}

export const GET: APIRoute = async () => {
  if (!import.meta.env.SPOTIFY_URL) {
    return new Response('Missing Spotify URL', { status: 500 })
  }

  const spotifyData = extractSpotifyData(
    await fetch(import.meta.env.SPOTIFY_URL).then((res) => res.text())
  )

  return new Response(
    JSON.stringify({
      ...spotifyData,
    }),
    {
      headers: {
        'Cache-Control': 'public, max-age=60',
      },
    }
  )
}
