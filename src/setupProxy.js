const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/v1/papago',
    createProxyMiddleware({
      target: 'https://openapi.naver.com',
      changeOrigin: true,
    })
  );
  app.use(
    '/v1/translation',
    createProxyMiddleware({
      target: 'https://kapi.kakao.com',
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