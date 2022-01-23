module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  url: env("SERVER_URL", "localhost"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "super-jwt-secret-key"),
    },
  },
});
