import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js — Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'wp-react',
  tagline: 'A modern, type-safe React toolkit for headless WordPress with REST and GraphQL support',
  favicon: 'img/favicon.svg', // SVG is sharper than ICO for modern browsers
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'wp-react is a modern, type-safe React toolkit for headless WordPress with REST and GraphQL support',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'wp-react is a modern, type-safe React toolkit for building applications powered by the WordPress REST and GraphQL APIs.',
      },
    },
  ],

  // Future flags — see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true,
  },

  // Production URL (matches your js.org subdomain)
  url: 'https://wp-react.js.org',
  // Base path — js.org serves from root, so '/' is correct
  baseUrl: '/',
  // Prevent trailing slashes (cleaner URLs for js.org)
  trailingSlash: false,

  // GitHub Pages deployment
  organizationName: 'FarahmandM',
  projectName: 'wp-react',

  // Break the build on broken links or missing anchors
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/FarahmandM/wp-react/edit/master/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',

    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'wp-react',
      logo: {
        alt: 'wp-react Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://www.npmjs.com/package/wp-react',
          label: 'npm',
          position: 'right',
        },
        {
          href: 'https://github.com/FarahmandM/wp-react/releases',
          label: 'Releases',
          position: 'right',
        },
        {
          href: 'https://github.com/FarahmandM/wp-react',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/intro' },
            { label: 'Hooks', to: '/docs/hooks/overview' },
            { label: 'CLI', to: '/docs/cli' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Report an Issue',
              href: 'https://github.com/FarahmandM/wp-react/issues',
            },
            {
              label: 'Security Policy',
              href: 'https://github.com/FarahmandM/wp-react/security/policy',
            },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'npm', href: 'https://www.npmjs.com/package/wp-react' },
            { label: 'Releases', href: 'https://github.com/FarahmandM/wp-react/releases' },
            { label: 'GitHub', href: 'https://github.com/FarahmandM/wp-react' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} wp-react. Not affiliated with WordPress Foundation or Meta Platforms, Inc. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'javascript', 'diff'],
    },

  } satisfies Preset.ThemeConfig,
};

export default config;