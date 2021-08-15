import { BACKEND_URL } from './const';

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api', '/media', '/staticfiles'],
    createProxyMiddleware({
      target: `https://${BACKEND_URL}`,
      changeOrigin: true,
    }),
  );
};
