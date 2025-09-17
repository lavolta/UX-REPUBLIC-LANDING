export const en = {
  seo: {
    home: {
      title: 'The future is republic | en',
      description: 'Head description for the Home page EN.',
    },
  },
  hero: {
    title: 'Hero title from "en" file',
    subtitle: 'Hero subtitle',
  },
  heroHome: [
    { text: 'EN Tamer', isSpecialStyle: false },
    { text: 'of experiences that', isSpecialStyle: false },
    { text: 'put the user', isSpecialStyle: false },
    { text: 'at the center', isSpecialStyle: true },
  ],
  button: {
    navigationCta: 'Navigate',
    offerCta: 'Join our team',
    translateCta: 'EN',
    contactCta: 'Contact us',
  },
  agencies: {
    paris: {
      title: 'Paris-France',
      address: '163 quai du Docteur Dervaux, 92600 Asnières-sur-Seine',
    },
    bordeaux: {
      title: 'Bordeaux-France',
      address: '2 Rue du Jardin de l\'Ars, 33800 Bordeaux',
    },
    lyon: {
      title: 'Lyon-France',
      address: 'Boulevard de Stalingrad, 69100 Villeurbanne',
    },
    lille: {
      title: 'Lille-France',
      address: 'Boulevard Louis XIV, 59800 Lille',
    },
    bellgique: {
      title: 'Belgium',
      address: '12 Avenue de Broqueville, B-1150 Woluwe-Saint-Pierre',
    },
    suisse: {
      title: 'Switzerland',
      address: 'Route de la Longeraie, 1110 Morges',
    },
    luxembourge: {
      title: 'Luxembourg',
      address: 'Rue Emile Mark, Differdange',
    },
    paysbas: {
      title: 'Netherlands',
      address: 'Rue Emile Mark, Differdange',
    },
  },
  tags: {
    accessibility: 'Accessibility',
    security: 'Security',
    performance: 'Performance',
  },
  expert: {
    title: 'EN | My super title',
    cards: [
      {
        title: 'Card 1',
        text: 'EN | This is the text for card 1',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'card image 1',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Card 2',
        text: 'EN | This is the text for card 2',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'card image 2',
          href: '/images/img-1.jpg',
        },
      },
      {
        title: 'Card 3',
        text: 'EN | This is the text for card 3',
        tags: ['Ux', 'Ui'],
        picture: {
          alt: 'card image 3',
          href: '/images/img-1.jpg',
        },
      },
    ],
  },
} satisfies import('vue-i18n').DefineLocaleMessage
