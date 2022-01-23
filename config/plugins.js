// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    provider: 'local-path',
    providerOptions: {
      path: env('UPLOADS_PATH') || './public/uploads',
    },
  },
});