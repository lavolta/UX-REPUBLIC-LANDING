import type { GridItemTextInterface } from '@/interfaces'
interface UxRepublicArticleInterface {
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

export const formatDate = (dateString) => {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0') // ex: 01
  const months = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUI', 'JUIL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC']
  const month = months[date.getMonth()] // ex: SEP
  const year = String(date.getFullYear()).slice(-2) // ex: 25

  return `${day} ${month} ${year}`
}

export const cleanExcerpt = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const text = doc.body.textContent || ''
  return text.trim()
}

export const cleanDataArcticleFromUxRepublicResponse = (data: UxRepublicArticleInterface): GridItemTextInterface => {
  return {
    date: formatDate(data.date),
    href: data.link,
    text: cleanExcerpt(data.excerpt.rendered),
    title: data.title.rendered,
    type: 'text',
  }
}
