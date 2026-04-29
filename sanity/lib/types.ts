import type { SanityImageSource } from '@sanity/image-url'

export interface SanityProject {
  _id: string
  name: string
  tags: string[]
  image: SanityImageSource
  isTall: boolean
  order: number
}

export interface SanityService {
  _id: string
  index: string
  name: string
  desc: string
  image: SanityImageSource
  order: number
}

export interface SanityTestimonial {
  _id: string
  name: string
  quote: string
  logo: SanityImageSource
  logoMobile?: SanityImageSource
  order: number
}

export interface SanityNewsArticle {
  _id: string
  image: SanityImageSource
  desc: string
  desktopOffset: boolean
  order: number
}
