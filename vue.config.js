const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    port:8080

  },
  transpileDependencies: true
})






