import project1Img from '../assets/project1.png'
import project2Img from '../assets/project2.png'
import project3Img from '../assets/project3.png'
import project4Img from '../assets/project4.webp'
import ghostfmImg from '../assets/ghostfm-pres.png'
import elevenfmVideo from '../assets/elevenfm-pres.mp4'
import redditgrabVideo from '../assets/redditgrab-pres.mp4'
import project3ImgAlt from '../assets/project3-alt.png'

export const isProduction = import.meta.env.PROD

export const underlineColors = [
  'decoration-primary',
  'decoration-orange-600',
  'decoration-indigo-600',
  'decoration-green-600',
  'decoration-blue-600',
  'decoration-red-600',
  'decoration-purple-600',
]

export const random = <T>(element: T[]): T => {
  return element[Math.floor(Math.random() * element.length)]
}

export const projects = [
  {
    title: 'ElevenFM',
    img: project1Img.src,
    video: elevenfmVideo,
    imgAlt: '',
    description:
      'A functional Spotify clone connected to multiple APIs to deliver universal playlists, lyrics, videoclips, and more.',
    repo: 'https://github.com/sebastianwd/elevenfm',
    url: 'https://elevenfm.com' as string,
    stack: ['tailwind', 'graphql', 'react', 'nextjs', 'sqlite'],
  },
  {
    title: 'RedditGrab',
    img: project4Img.src,
    video: redditgrabVideo,
    imgAlt: project3ImgAlt.src,
    description:
      'A Chrome/Firefox extension that allows you to download images and videos from Reddit in an automated way.',
    repo: 'https://github.com/sebastianwd/redditgrab',
    url: '',
    stack: ['react', 'wxt', 'tailwind'],
  },
  {
    title: 'Pet breed classifier',
    img: project3Img.src,
    video: '',
    imgAlt: project3ImgAlt.src,
    description:
      'Project made while learning Python and PyTorch. A pet breed classifier that uses a pre-trained model to classify images of cats and dogs.',
    repo: 'https://github.com/sebastianwd/fastai-pet-classifier',
    url: '',
    stack: ['python', 'jupyter', 'docker'],
  },

  {
    title: 'GhostFM app',
    img: ghostfmImg.src,
    video: '',
    imgAlt: '',
    description:
      'A mobile app I made as a college project. Similar to my more recent project ElevenFM but also plays local files.',
    repo: 'https://github.com/sebastianwd/ghostfm-react-native',
    url: '',
    stack: ['react-native'],
  },
] as const

export const additionalProjects = [
  {
    title: 'YouTube downloader',
    img: project2Img.src,
    video: '',
    imgAlt: '',
    description: 'Simple YouTube video downloader.',
    repo: 'https://github.com/sebastianwd/ez-yt-downloader',
    url: '',
    stack: ['react'],
  },
] as const
