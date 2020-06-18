module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  productionSourceMap: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: () => {
    return {
      output: {
        filename: '[name].[hash:8].js'
      },
      performance: {
        maxEntrypointSize: 2048000,
        maxAssetSize: 1024000
      }
    }
  }
}
