export * from './en'
export * from './fr'

export const LOCALES = ['fr', 'en'] as const
export type AppLocale = typeof LOCALES[number]

export function isAppLocale(x: string): x is AppLocale {
  return (LOCALES as readonly string[]).includes(x)
}