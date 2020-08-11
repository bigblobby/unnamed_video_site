require('dotenv').config();
const https = require('https');
const http = require('http');
const app = require('./app');
const port = process.env.PORT;

async function startServer() {
   try {
      http.createServer(app).listen(port);
      https.createServer({}, app).listen(443);
      console.log(`Listening on port ${port}`)
   } catch(e) {
      console.error(e);
   }
}

startServer();

