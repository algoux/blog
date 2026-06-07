import {
  POSTS_PER_PAGE,
  filterPostsByProduct,
  getPostSlug,
  getPostUrl,
  paginatePosts,
  formatPostDate,
  sortPostsByDate,
} from './posts';

type TestPost = {
  id: string;
  data: {
    title: string;
    pubDate: Date;
    product: 'algoux' | 'algo-bootstrap' | 'rankland' | 'paste-then-ac';
    draft?: boolean;
  };
};

const post = (
  id: string,
  pubDate: string,
  product: TestPost['data']['product'] = 'algoux'
): TestPost => ({
  id,
  data: {
    title: id,
    pubDate: new Date(pubDate),
    product,
  },
});

describe('post helpers', () => {
  it('sorts posts by publish date newest first without mutating input', () => {
    const oldest = post('oldest/index.md', '2026-01-01');
    const newest = post('newest/index.md', '2026-06-01');
    const middle = post('middle/index.md', '2026-03-01');
    const input = [oldest, newest, middle];

    const sorted = sortPostsByDate(input);

    expect(sorted.map((entry) => entry.id)).toEqual([
      'newest/index.md',
      'middle/index.md',
      'oldest/index.md',
    ]);
    expect(input.map((entry) => entry.id)).toEqual([
      'oldest/index.md',
      'newest/index.md',
      'middle/index.md',
    ]);
  });

  it('derives stable post slugs from index and non-index markdown ids', () => {
    expect(getPostSlug(post('rankland-launch/index.md', '2026-01-01'))).toBe(
      'rankland-launch'
    );
    expect(getPostSlug(post('release-notes.mdx', '2026-01-01'))).toBe(
      'release-notes'
    );
    expect(getPostSlug(post('products/rankland/index.mdx', '2026-01-01'))).toBe(
      'products/rankland'
    );
  });

  it('builds canonical post urls from derived slugs', () => {
    expect(getPostUrl(post('rankland-launch/index.md', '2026-01-01'))).toBe(
      '/posts/rankland-launch/'
    );
  });

  it('filters posts by product id', () => {
    const posts = [
      post('algoux/index.md', '2026-01-01', 'algoux'),
      post('rankland/index.md', '2026-01-02', 'rankland'),
      post('paste/index.md', '2026-01-03', 'paste-then-ac'),
    ];

    expect(filterPostsByProduct(posts, 'rankland').map((entry) => entry.id)).toEqual([
      'rankland/index.md',
    ]);
  });

  it('paginates posts into fixed-size pages with route metadata', () => {
    const posts = Array.from({ length: POSTS_PER_PAGE + 2 }, (_, index) =>
      post(`post-${index}/index.md`, `2026-01-${String(index + 1).padStart(2, '0')}`)
    );

    const pages = paginatePosts(posts, '/products/rankland/');

    expect(pages).toHaveLength(2);
    expect(pages[0]).toMatchObject({
      currentPage: 1,
      totalPages: 2,
      nextUrl: '/products/rankland/page/2/',
      previousUrl: undefined,
    });
    expect(pages[1]).toMatchObject({
      currentPage: 2,
      totalPages: 2,
      previousUrl: '/products/rankland/',
      nextUrl: undefined,
    });
    expect(pages[0].posts).toHaveLength(POSTS_PER_PAGE);
    expect(pages[1].posts).toHaveLength(2);
  });

  it('formats dates as YYYY-MM-DD', () => {
    expect(formatPostDate(new Date('2026-06-06T00:00:00Z'))).toBe('2026-06-06');
  });
});
