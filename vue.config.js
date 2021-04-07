
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? '//cdn-bdas.xiaosiro.cn/' : '/',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
      },
    },
  },
};