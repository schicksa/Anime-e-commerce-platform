const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,

  css: {
    loaderOptions: {
      // sass: {
      //   prependData: `
      //     @import "~@/assets/name.scss";
      //   `
      // },
      // scss: {
      //   prependData: `@import "~@/variables.scss";`
      // },
      less:{
        lessOptions:{
          globalVars: {
            barBgColor: '#333'
          }
        }
      }
    }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  },

})

