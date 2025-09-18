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
  news: {
    items: [
      {
        title: 'L’IA transforme le secteur automobile',
        text: 'Près de 30 % des budgets du secteur automobile sont aujourd’hui dédiés à l’innovation. Une stratégie qui bouscule les normes et redéfinit en profondeur l’industrie.',
        date: '01 SEP 25',
        href: 'https://www.ux-republic.com/lia-dans-lautomobile-revolution-securitaire-et-defis-ux/',
        type: 'text',
      },
      {
        title: 'Conduite augmentée et défis UX : quels enjeux dans le monde de l’automobile',
        text: 'Comme évoqué dans un précédent article, le véhicule d’aujourd’hui ne se résume plus à un simple moyen de transport. Il devient un véritable espace de vie connecté et personnalisé.',
        date: '28 AOÛ 25',
        href: 'https://www.ux-republic.com/ux-automobile-les-enjeux-de-la-conduite-augmentee/',
        type: 'text',
      },
      {
        type: 'img',
        image: {
          alt: 'test',
          href: '/images/project/project-item-media-1.gif',
        },
      },
      {
        title: 'La méthode de test Wizard of Oz pour simuler des services complexes',
        text: '',
        date: '22 AOÛ 25',
        href: 'https://www.ux-republic.com/methode-wizard-of-oz-le-guide-pour-vos-tests-utilisateur/',
        type: 'text',
      },
      {
        title: 'Quand les innovations pour le handicap transforment notre quotidien',
        text: '',
        date: '20 AOÛ 25',
        href: 'https://www.ux-republic.com/accessibilite-et-ux-quand-linnovation-profite-a-tous/',
        type: 'text',
      },
      {
        type: 'img',
        image: {
          alt: 'test',
          href: '/images/clients/mbappe.gif',
        },
      },
      {
        title: 'Midjourney Vidéo : Quand l’IA révolutionne aussi la vidéo !',
        text: 'Si tu es déjà familier avec Midjourney, tu sais à quel point cette IA a transformé le monde du design graphique en produisant des illustrations époustouflantes en un rien de temps. ',
        date: '03 JUI 25',
        href: 'https://www.ux-republic.com/midjourney-video-quand-lia-revolutionne-aussi-la-video/',
        type: 'text',
      },
      {
        type: 'img',
        image: {
          alt: 'test',
          href: '/images/clients/mouvingbg.gif',
        },
      },
    ],
  },
} satisfies import('vue-i18n').DefineLocaleMessage
