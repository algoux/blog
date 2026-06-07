export const productIds = [
  'algoux',
  'algo-bootstrap',
  'rankland',
  'paste-then-ac',
] as const;

export type ProductId = (typeof productIds)[number];

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  href: string;
  accent: string;
  order: number;
};

export const products: Record<ProductId, Product> = {
  algoux: {
    id: 'algoux',
    name: 'algoUX',
    description: '我们的官方动态与声明。',
    href: 'https://algoux.org/',
    accent: '#31c2d7',
    order: 0,
  },
  'algo-bootstrap': {
    id: 'algo-bootstrap',
    name: 'Algo Bootstrap',
    description: '为初学者打造的现代化编程环境配置工具。',
    href: 'https://ab.algoux.cn/',
    accent: '#212529',
    order: 1,
  },
  rankland: {
    id: 'rankland',
    name: 'RankLand',
    description: '卓越的算法竞赛榜单数据分发平台。',
    href: 'https://rl.algoux.cn/',
    accent: '#FFBB26',
    order: 2,
  },
  'paste-then-ac': {
    id: 'paste-then-ac',
    name: 'Paste then AC',
    description: '轻量、快速的云端代码剪贴板。',
    href: 'https://paste.then.ac/',
    accent: '#3CA3F6',
    order: 3,
  },
};

export const productList = productIds
  .map((id) => products[id])
  .sort((a, b) => a.order - b.order);

export const isProductId = (value: string): value is ProductId =>
  productIds.includes(value as ProductId);
