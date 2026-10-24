/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.jsx'],
  experimental: {
    // optimizeCss: true,
    // nextScriptWorkers: true,
  },
  // uncomment the following snippet if using styled components
  // compiler: {
  //   styledComponents: true,
  // },
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.

  images: { unoptimized: true },
  webpack(config, { isServer }) {
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@': path.resolve(__dirname),
    //   '@src/': path.resolve(__dirname, 'src'),
    //   '@app/': path.resolve(__dirname, 'app'),
    // };
    if (!isServer) {
      // We're in the browser build, so we can safely exclude the sharp module
      config.externals.push('sharp');
    }
    // shader support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader'],
    });

    return config;
  },
  headers: async () => [
    {
      source: '/papers/sfp.pdf',
      headers: [
        { key: 'Content-Type', value: 'application/pdf' },
        { key: 'Content-Disposition', value: 'inline; filename="SFP-Research-Paper.pdf"' },
      ],
    },
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
    {
      source: '/404',
      destination: '/',
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
