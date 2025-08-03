import LINKS from './links';

const MENUS = {
  header: [
    {
      text: 'Services',
      to: '#services',
      sections: [
        {
          name: 'Web Development',
          description: 'Custom websites and web applications',
          items: [
            {
              icon: 'web',
              title: 'Frontend Development',
              description: 'React, Vue, Angular applications',
              to: '#frontend',
            },
            {
              icon: 'backend',
              title: 'Backend Development',
              description: 'Node.js, Python, PHP solutions',
              to: '#backend',
            },
            {
              icon: 'fullstack',
              title: 'Full-Stack Solutions',
              description: 'Complete web applications',
              to: '#fullstack',
            },
          ],
        },
        {
          name: 'Mobile Development',
          description: 'iOS and Android applications',
          items: [
            {
              icon: 'mobile',
              title: 'Native Apps',
              description: 'iOS and Android development',
              to: '#native-apps',
            },
            {
              icon: 'hybrid',
              title: 'Cross-Platform',
              description: 'React Native, Flutter apps',
              to: '#cross-platform',
            },
          ],
        },
      ],
    },
    {
      text: 'Portfolio',
      to: '#portfolio',
    },
    {
      text: 'About',
      to: '#about',
    },
    {
      text: 'Contact',
      to: '#contact',
    },
  ],
  footer: [
    {
      heading: 'Services',
      items: [
        {
          text: 'Web Development',
          to: '#web-development',
        },
        {
          text: 'Mobile Apps',
          to: '#mobile-apps',
        },
        {
          text: 'Cloud Solutions',
          to: '#cloud-solutions',
        },
        {
          text: 'IT Consulting',
          to: '#consulting',
        },
      ],
    },
    {
      heading: 'Company',
      items: [
        {
          text: 'About Us',
          to: '#about',
        },
        {
          text: 'Our Team',
          to: '#team',
        },
        {
          text: 'Careers',
          to: '#careers',
        },
        {
          text: 'Contact',
          to: '#contact',
        },
      ],
    },
    {
      heading: 'Resources',
      items: [
        {
          text: 'Portfolio',
          to: '#portfolio',
        },
        {
          text: 'Case Studies',
          to: '#case-studies',
        },
        {
          text: 'Blog',
          to: '#blog',
        },
        {
          text: 'Documentation',
          to: '#docs',
        },
      ],
    },
    {
      heading: 'Support',
      items: [
        {
          text: 'Help Center',
          to: '#help',
        },
        {
          text: 'Contact Support',
          to: '#support',
        },
        {
          text: 'Community',
          to: '#community',
        },
        {
          text: 'Status',
          to: '#status',
        },
      ],
    },
  ],
};

export default MENUS;
