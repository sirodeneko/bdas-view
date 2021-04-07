module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            "primary-color": "#6777EF",
            "link-color": "#6777EF",
            "border-radius-base": "7px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "//cdn-bdas.xiaosiro.cn/" : "/",
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
