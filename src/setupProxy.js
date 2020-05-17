const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/language',
    createProxyMiddleware({
      target: 'https://translation.googleapis.com',
      changeOrigin: true,
    })
  );
};