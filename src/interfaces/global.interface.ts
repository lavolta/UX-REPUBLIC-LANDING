export interface PictureInterface {
  href: string
  alt: string
}
export interface GridItemSocialInterface {
  type: 'social'
  title: string
  link: string
  buttonText: string
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
  tags: string[]
}

export type ItemThemeType = 'theme-1' | 'theme-2' | 'theme-3' | 'theme-4' | 'theme-5' | 'theme-6' | 'theme-7'
export interface AgencyItemInterface {
  title: string
  address: string
  email?: string
  theme: ItemThemeType
  picture: PictureInterface
  pictureM?: PictureInterface
}

export interface ProjectItemInterface {
  title: string
  subtitle?: string
  content: string
  picture: PictureInterface
  theme: ItemThemeType
}

export interface UxRepublicArticleInterface {
  id: number
  date: string
  link: string
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
    key: string
    format: string
  }
}

interface NavigationItemInternalLink {
  href: string
  content: string
  type: 'internal'
}

interface NavigationItemAnchorLink {
  href: string
  content: string
  type: 'anchor'
}

interface NavigationItemExternalLink {
  href: string
  content: string
  type: 'link'
}
interface NavigationItemButton {
  content: string
  type: 'button'
}

export type NavigationItem = NavigationItemInternalLink | NavigationItemExternalLink | NavigationItemButton | NavigationItemAnchorLink

export interface SeoPageInterface {
  title: string
  description: string
}

export interface CountItem {
  title: string
  value: number
  displayValue: number
  suffix: string
}

export interface StackSliderItem {
  title: string
  text: string
  tags: string[]
  mainpicture: PictureInterface
  secondarypicture: PictureInterface
}
