export function GET() {
  return new Response(
    ['User-agent: *', 'Allow: /', 'Sitemap: https://blog.algoux.org/sitemap-index.xml', ''].join(
      '\n'
    ),
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    }
  );
}

