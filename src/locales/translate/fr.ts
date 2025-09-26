export const fr = {
  seo: {
    home: {
      title: 'The futur is republic',
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
    navigationCta: 'Naviguer',
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
          href: '/images/dog.gif',
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
        type: 'social',
        title: 'Actualités & <br> événements',
        buttonText: 'Suivez-nous',
        link: 'https://www.linkedin.com/company/ux-republic',
        socialType: 'linkedin',
      },
      {
        title: 'Midjourney Vidéo : Quand l’IA révolutionne aussi la vidéo !',
        text: 'Si tu es déjà familier avec Midjourney, tu sais à quel point cette IA a transformé le monde du design graphique en produisant des illustrations époustouflantes en un rien de temps. ',
        date: '03 JUI 25',
        href: 'https://www.ux-republic.com/midjourney-video-quand-lia-revolutionne-aussi-la-video/',
        type: 'text',
      },
      {
        type: 'social',
        title: 'Replays & <br> vidéos',
        buttonText: 'Abonnez-vous',
        link: 'https://www.youtube.com/@UXREPUBLICParis',
        socialType: 'youtube',
      },
    ],
  },
  project: {
    title: 'Nos réussites',
    items: [
      {
        title: 'BPCE',
        content: 'Nos experts UX/UI, Product et Analytics travaillent avec BPCE depuis 2017 pour optimiser leur performance digitale.',
        theme: 'theme-1',
        picture: {
          alt: '',
          href: '/images/project/project-item-media-1.png',
        },
      },
      {
        title: 'LVMH',
        content: 'Depuis 2014, notre design d\'expérience accompagne LVMH, reflétant l\'excellence initiée avec Louis Vuitton.',
        theme: 'theme-2',
        picture: {
          alt: '',
          href: '/images/project/project-item-media-2.png',
        },
      },
      {
        title: 'NAVBLUE',
        content: 'Partenaires de NAVBLUE (Groupe Airbus) depuis 2018, nous créons des produits digitaux qui assurent leur avance technologique.',
        theme: 'theme-3',
        picture: {
          alt: '',
          href: '/images/project/project-item-media-3.png',
        },
      },
    ],
  },
} satisfies import('vue-i18n').DefineLocaleMessage
