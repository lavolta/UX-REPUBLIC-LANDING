export const en = {
  seo: {
    home: {
      title: 'The futur is republic | en',
      description: 'Description dans le head pour la page Accueil EN.',
    },
  },
  hero: {
    title: 'Hero title from "en" file',
    subtitle: 'Hero subtitle',
  },
  heroHome: [
    { text: 'EN Dompteur', isSpecialStyle: false },
    { text: 'd’expériences qui', isSpecialStyle: false },
    { text: 'mettent l’utilisateur', isSpecialStyle: false },
    { text: 'au centre', isSpecialStyle: true },
  ],
  button: {
    navigationCta: 'Navigate',
    offerCta: 'Join our team',
    translateCta: 'EN',
    contactCta: 'Contact us',
  },
  tags: {
    accessibility: 'Accessibility',
    security: 'Security',
    performance: 'Performance',
  },
  expert: {
    title: 'EN | Mon super titre',
    cards: [
      {
        title: 'Carte 1',
        text: 'EN | Ceci est le text de la carte 1',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 1',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Carte 2',
        text: 'EN | Ceci est le text de la carte 2',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 2',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Carte 3',
        text: 'EN | Ceci est le text de la carte 3',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 3',
          href: '/images/img-1.jpg',
        },
      },
    ],
  },
  brand: {
    title: 'EN | Ils nous font confiance',
    subtitle: 'EN | Depuis plus de 10 ans, de grandes entreprises et institutions nous confient la conception et l’optimisation de leurs expériences digitales. Leur confiance, renouvelée projet après projet, témoigne de la qualité et de l’impact de nos expertises.',
    listing: [[
      {
        picture: {
          alt: 'He trusts us | airbus',
          href: '/images/clients/airbus.png',
        },
      },
      {
        picture: {
          alt: 'He trusts us | airbus',
          href: '/images/clients/airbus.png',
        },
      },
      {
        picture: {
          alt: 'He trusts us | generali',
          href: '/images/clients/generali.png',
        },
      },
      {
        picture: {
          alt: 'He trusts us | Leroy merlin',
          href: '/images/clients/leroymerlin.png',
        },
      },
      {
        picture: {
          alt: 'He trusts us | bouygues',
          href: '/images/clients/bouygues.png',
        },
      },
      {
        picture: {
          alt: 'He trusts us | gameloft',
          href: '/images/clients/gameloft.png',
        },
      },
    ]],
  },
} satisfies import('vue-i18n').DefineLocaleMessage
