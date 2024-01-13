export const isProduction = import.meta.env.PROD

export const underlineColors = [
  'decoration-red-600',
  'decoration-orange-600',
  'decoration-yellow-600',
  'decoration-green-600',
  'decoration-blue-600',
  'decoration-indigo-600',
]

export const random = <T>(element: T[]): T => {
  return element[Math.floor(Math.random() * element.length)]
}
