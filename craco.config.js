module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Enable ES module support
      webpackConfig.resolve.extensionAlias = {
        '.js': ['.js', '.ts', '.tsx'],
        '.mjs': ['.mjs', '.js', '.ts', '.tsx'],
      };

      // Handle ES modules properly
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });

      // Ensure proper module resolution
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: false,
      };

      return webpackConfig;
    },
  },
};
