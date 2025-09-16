export const fr = {
  seo: {
    home: {
      title: 'The futur is republic | fr',
      description: 'Description dans le head pour la page Accueil FR.',
    },
  },
  hero: {
    title: 'Hero titre "fr" file',
    subtitle: 'Hero sous titre',
  },
  heroHome: [
    { text: 'Dompteur', isSpecialStyle: false },
    { text: 'd’expériences qui', isSpecialStyle: false },
    { text: 'mettent l’utilisateur', isSpecialStyle: false },
    { text: 'au centre', isSpecialStyle: true },
  ],
  button: {
    offerCta: 'Rejoignez-nous',
    translateCta: 'FR',
    contactCta: 'Contactez-nous',
  },
  tags: {
    accessibility: 'Accessibilité',
    security: 'Sécurité',
    performance: 'Performance',
  },
  expert: {
    title: 'mon super titre',
    cards: [
      {
        title: 'Carte 1',
        text: 'Ceci est le text de la carte 1',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 1',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Carte 2',
        text: 'Ceci est le text de la carte 2',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 2',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Carte 3',
        text: 'Ceci est le text de la carte 3',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'image carte 3',
          href: '/images/img-1.jpg',
        },
      },
    ],
  },
} satisfies import('vue-i18n').DefineLocaleMessage
