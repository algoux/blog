import type { ProductId } from './products';

export const POSTS_PER_PAGE = 6;

export type PostLike = {
  id: string;
  data: {
    pubDate: Date;
    product: ProductId;
    draft?: boolean;
  };
};

export type PaginatedPosts<TPost> = {
  posts: TPost[];
  currentPage: number;
  totalPages: number;
  previousUrl?: string;
  nextUrl?: string;
};

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '');

const pageUrl = (basePath: string, page: number) => {
  const cleanBase = `/${trimSlashes(basePath)}`;
  if (page <= 1) {
    return `${cleanBase === '/' ? '' : cleanBase}/`;
  }

  return `${cleanBase === '/' ? '' : cleanBase}/page/${page}/`;
};

export const sortPostsByDate = <TPost extends PostLike>(posts: TPost[]) =>
  [...posts].sort(
    (left, right) => right.data.pubDate.getTime() - left.data.pubDate.getTime()
  );

export const getPublishedPosts = <TPost extends PostLike>(posts: TPost[]) =>
  sortPostsByDate(posts.filter((post) => !post.data.draft));

export const filterPostsByProduct = <TPost extends PostLike>(
  posts: TPost[],
  product: ProductId
) => posts.filter((post) => post.data.product === product);

export const getPostSlug = (post: Pick<PostLike, 'id'>) =>
  post.id
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx|mdoc)$/i, '')
    .replace(/\/index$/i, '');

export const getPostUrl = (post: Pick<PostLike, 'id'>) =>
  `/posts/${getPostSlug(post)}/`;

export const paginatePosts = <TPost extends PostLike>(
  posts: TPost[],
  basePath: string,
  pageSize = POSTS_PER_PAGE
): PaginatedPosts<TPost>[] => {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));

  return Array.from({ length: totalPages }, (_, index) => {
    const currentPage = index + 1;
    const start = index * pageSize;
    const pagePosts = posts.slice(start, start + pageSize);

    return {
      posts: pagePosts,
      currentPage,
      totalPages,
      previousUrl:
        currentPage > 1 ? pageUrl(basePath, currentPage - 1) : undefined,
      nextUrl: currentPage < totalPages ? pageUrl(basePath, currentPage + 1) : undefined,
    };
  });
};

export const formatPostDate = (date: Date) => date.toISOString().slice(0, 10);
