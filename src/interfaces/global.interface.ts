export interface PictureInterface {
  href: string
  alt: string
}
export interface HeroBannerTextInterface {
  text: string
  isSpecialStyle: boolean
}

export type NewsItemType = GridItemImageInterface | GridItemTextInterface
export interface GridItemImageInterface {
  image: PictureInterface
  type: 'img'
}
export interface GridItemTextInterface {
  title: string
  text: string
  date: string
  href: string
  type: 'text'
}

export interface XpItemInterface {
  title: string
  text: string
  mainpicture: PictureInterface
  secondarypicture: PictureInterface
}

export type AgencyItemTheme = 'theme-1' | 'theme-2' | 'theme-3' | 'theme-4' | 'theme-5' | 'theme-6' | 'theme-7'
export interface AgencyItemInterface {
  title: string
  address: string
  email?: string
  theme: AgencyItemTheme
  picture: PictureInterface
}
