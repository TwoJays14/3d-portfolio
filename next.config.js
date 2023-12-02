/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add the file-loader rule for handling glb files
    config.module.rules.push({
      test: /\.(glb)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/files',
            outputPath: 'static/files',
            name: '[name].[ext]',
          },
        },
      ],
    });

    // Add the file-loader rule for handling mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/audio',
            outputPath: 'static/audio',
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
