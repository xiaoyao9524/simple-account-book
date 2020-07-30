
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/index',
      {
        target: 'https://www.bilibili.com',
        changeOrigin: true
      }
    )
  );
};
