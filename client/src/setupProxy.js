
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
  app.use(
    createProxyMiddleware(
      '/api',
      {
        target: 'http://xiaoyao9524.top:7001',
        changeOrigin: true
      }
    )
  );
};
