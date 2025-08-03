const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const { getAllPosts, getAllChangelogs } = require('./src/utils/api-docs');
const generateChangelogPath = require('./src/utils/generate-changelog-path');
const generateDocPagePath = require('./src/utils/generate-doc-page-path');

const defaultConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=31536000',
          },
        ],
      },
      {
        source: '/home',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=31536000',
          },
        ],
      },
      {
        source: '/fonts/:slug*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          },
        ],
      },
      {
        source: '/animations/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/videos/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/docs/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/images/technology-logos/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/blog/parsing-json-from-postgres-in-js',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    // Dewibe saytida redirectlar hozircha kerak emas
    return [];
  },
  async rewrites() {
    return [
      {
        source: '/api_spec/release/v2.json',
        destination: 'https://dfv3qgd2ykmrx.cloudfront.net/api_spec/release/v2.json',
      },
      {
        source: '/demos/ping-thing',
        destination: 'https://ping-thing.vercel.app/demos/ping-thing',
      },
      {
        source: '/demos/ping-thing/:path*',
        destination: 'https://ping-thing.vercel.app/demos/ping-thing/:path*',
      },
      {
        source: '/demos/playground',
        destination: 'https://postgres-ai-playground.vercel.app/demos/playground',
      },
      {
        source: '/demos/playground/:path*',
        destination: 'https://postgres-ai-playground.vercel.app/demos/playground/:path*',
      },
      {
        source: '/demos/instant-postgres',
        destination: 'https://instant-postgres.mahmoudw.com/demos/instant-postgres',
      },
      {
        source: '/demos/instant-postgres/:path*',
        destination: 'https://instant-postgres.mahmoudw.com/demos/instant-postgres/:path*',
      },
      {
        source: '/developer-days/:path*',
        destination: 'https://neon-dev-days-next.vercel.app/developer-days/:path*',
      },
      {
        source: '/demos/regional-latency',
        destination: 'https://latency-benchmarks-dashboard.vercel.app/demos/regional-latency',
      },
      {
        source: '/demos/regional-latency/:path*',
        destination:
          'https://latency-benchmarks-dashboard.vercel.app/demos/regional-latency/:path*',
      },
      {
        source: '/dev-for-rds',
        destination: 'https://dev-for-rds.vercel.app/dev-for-rds',
      },
      {
        source: '/dev-for-rds/:path*',
        destination: 'https://dev-for-rds.vercel.app/dev-for-rds/:path*',
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports not ending in ".inline.svg"
      {
        test: /(?<!inline)\.svg$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 512,
              publicPath: '/_next/static/svgs',
              outputPath: 'static/svgs',
              fallback: require.resolve('file-loader'),
            },
          },
          {
            loader: require.resolve('svgo-loader'),
          },
        ],
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.inline.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  'prefixIds',
                ],
              },
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  env: {
    INKEEP_INTEGRATION_API_KEY: process.env.INKEEP_INTEGRATION_API_KEY,
    INKEEP_INTEGRATION_ID: process.env.INKEEP_INTEGRATION_ID,
    INKEEP_ORGANIZATION_ID: process.env.INKEEP_ORGANIZATION_ID,
  },
};

module.exports = withBundleAnalyzer(defaultConfig);
