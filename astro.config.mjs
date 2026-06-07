import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';

export default defineConfig({
  site: 'https://blog.algoux.org',
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      styleOverrides: {
        borderRadius: '8px',
        frames: {
          editorActiveTabBackground: 'var(--code-tab-bg)',
          editorActiveTabIndicatorBottomColor: 'var(--color-primary)',
          editorTabBarBackground: 'var(--code-frame-bg)',
          terminalTitlebarBackground: 'var(--code-frame-bg)',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeSlug, rehypeKatex],
    }),
  },
});
