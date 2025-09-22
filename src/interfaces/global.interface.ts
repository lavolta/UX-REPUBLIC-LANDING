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

export interface AgencyItemInterface {
  title: string
  address: string
  email?: string
  picture: PictureInterface
}
