export interface PictureInterface {
  href: string
  alt: string
}
export interface HeroBannerTextInterface {
  text: string
  isSpecialStyle: boolean
}
export interface GridItemSocialInterface {
  type: 'social'
  socialType: 'linkedin' | 'youtube'
}

export type NewsItemType = GridItemImageInterface | GridItemTextInterface | GridItemSocialInterface
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
