module.exports = async function ({ env }) {
  return {
    webpack: {
      configure: (webpackConfig, { env: envHere, paths }) => {
        // Remove source-map-loader
        // https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
        if (
          webpackConfig.module.rules[0] &&
          webpackConfig.module.rules[0].loader.includes("source-map-loader")
        ) {
          webpackConfig.module.rules.splice(0, 1)
        }

        return webpackConfig
      },
    },
  }
}
