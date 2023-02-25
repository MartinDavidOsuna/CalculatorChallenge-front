const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    https: true,
    port:443,
  },
  transpileDependencies: true
})






