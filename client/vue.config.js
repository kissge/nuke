module.exports = {
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:3000',
      },
    },
  },
};
