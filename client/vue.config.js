module.exports = {
  baseUrl: '/nuke/',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api*': {
        target: 'http://localhost:3002',
      },
      '/auth*': {
        target: 'http://localhost:3002',
      },
    },
  },
};
