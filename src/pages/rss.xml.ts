import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { getPostUrl, getPublishedPosts } from '../lib/posts';
import { products } from '../lib/products';

export async function GET(context: APIContext) {
  const posts = getPublishedPosts(await getCollection('posts'));

  return rss({
    title: 'algoUX Blog',
    description: 'algoUX 的产品动态、版本说明与设计记录。',
    site: context.site ?? 'https://blog.algoux.org',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: getPostUrl(post),
      categories: [products[post.data.product].name, ...post.data.tags],
    })),
  });
}
