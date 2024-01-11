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
  const spotifyData = extractSpotifyData(
    await fetch(
      'https://spotify-github-profile.vercel.app/api/view?uid=kodoku2&cover_image=true'
    ).then((res) => res.text())
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
