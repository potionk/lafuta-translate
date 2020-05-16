export default {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'icon-home',
    },
    {
      name: '번역',
      url: '/translate',
      icon: 'icon-bulb',
    },
    {
      name: '웹번역',
      url: '/translate_web',
      icon: 'icon-bulb',
    },
    {
      name: 'Community',
      url: '/community',
      icon: 'icon-note',
      children: [
        {
          name: '자유게시판',
          url: '/community/free',
          icon: 'icon-pencil',
        },
        {
          name: '[추천]공모전',
          url: '/community/free',
          icon: 'icon-pencil',
        },
        {
          name: '[추천]논문',
          url: '/community/free',
          icon: 'icon-pencil',
        },
      ],
    },
    {
      name: '데이터기여',
      url: '/contribute',
      icon: 'icon-bulb',
    },
  ],
};