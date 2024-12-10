import project1Img from '../assets/project1.png'
import project2Img from '../assets/project2.png'
import project3Img from '../assets/project3.png'
import ghostfmImg from '../assets/ghostfm-pres.png'
import elevenfmVideo from '../assets/elevenfm-pres.mp4'
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
      'A music streaming service that uses YouTube for audio/video and Last.fm/TheAudioDB APIs for artist and album data.',
    repo: 'https://github.com/sebastianwd/elevenfm',
    url: 'https://elevenfm.com' as string,
    stack: ['tailwind', 'graphql', 'react', 'nextjs', 'sqlite'],
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
