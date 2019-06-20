module.exports = {
  mongodb: {
    dbURI: process.env.MONGO_URI
  },
  jwt: {
    signature: process.env.JWT_SIGNATURE
  },
  sendGridKey: process.env.SENDGRID_KEY
};
