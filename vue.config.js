const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: "all",
    port:80
    /*server:{  FOR HTTPS CONNECTIONS
      type:'https',
    },
    port:443 */
  },
  transpileDependencies: true
})






