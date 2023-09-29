// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/dracula')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Qrupones',
  tagline: 'Documentación de integración para el sistema Qrupones',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://qruponesdocs-production.up.railway.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'qrupones', // Usually your GitHub org/user name.
  projectName: 'qruponesDocs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false
      },
      image: '/img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Qrupones',
        logo: {
          alt: 'Qrupones logo',
          src: 'img/LogoCortoQrupones.png'
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs'
          },
          // { to: '/blog', label: 'Blog', position: 'left' },

          {
            type: 'html',
            position: 'right',
            value: `<div style="display:flex;gap:.8rem;margin-left: 0.4rem;max-height: 30px;">
            <a href="https://www.facebook.com/qrupones" target="_blank" rel=”noopener noreferrer”><img style="width:30px;" src="/img/icons8-facebook-48.png"></a>
            <a href="https://www.instagram.com/qrupones" target="_blank" rel=”noopener noreferrer”><img style="width:30px;" src="/img/icons8-instagram-48.png"></a>
            </div>`
          }
        ]
      },
      // footer: {
      //   style: 'dark',
      //   links: [
      //     {
      //       title: 'Docs',
      //       items: [
      //         {
      //           label: 'Tutorial',
      //           to: '/docs/intro'
      //         }
      //       ]
      //     },
      //     {
      //       title: 'Community',
      //       items: [
      //         {
      //           label: 'Stack Overflow',
      //           href: 'https://stackoverflow.com/questions/tagged/docusaurus'
      //         },
      //         {
      //           label: 'Discord',
      //           href: 'https://discordapp.com/invite/docusaurus'
      //         },
      //         {
      //           label: 'Twitter',
      //           href: 'https://twitter.com/docusaurus'
      //         }
      //       ]
      //     },
      //     {
      //       title: 'More',
      //       items: [
      //         {
      //           label: 'Blog',
      //           to: '/blog'
      //         },
      //         {
      //           label: 'GitHub',
      //           href: 'https://github.com/facebook/docusaurus'
      //         }
      //       ]
      //     }
      //   ],
      //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`
      // },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp', 'php', 'java']
      }
    })
}

module.exports = config
