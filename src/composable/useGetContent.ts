import { useI18n } from 'vue-i18n'
export function useGetContent(contentToFind: string, isObject: boolean = false) {
  const { tm, t } = useI18n()
  const content = isObject ? tm(`${contentToFind}`) : t(`${contentToFind}`)
  return {
    content,
  }
}
