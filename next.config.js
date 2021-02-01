module.exports = {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/README',
        permanent: true,
      },
      {
        source: '/spec#:anchor',
        destination: '/spec/vulcain#:anchor',
        permanent: true,
      },
    ];
  },
};
