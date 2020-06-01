const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  urlMongoDB: process.env.URL_MONGODB,
  port: process.env.PORT,
}