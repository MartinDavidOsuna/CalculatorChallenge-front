const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    server:{
      type:'https',
    },
    port:443
  },
  transpileDependencies: true
})






