import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { findPdfs } from './src/utils/find-pdfs.mjs';

const siteUrl = 'https://securing.quest';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [
    mdx(),
    sitemap({
      customPages: findPdfs(siteUrl),
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: {
    ssr: {
      noExternal: ['@astrojs/mdx'],
    },
  },
});
