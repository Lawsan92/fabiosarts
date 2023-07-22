const express = require('express');
const path = require('path');
const cloudinary = require('./routes/cloudinary.js');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

//--------------------SERVER--------------------*/
const app = express();

//-------------------HTTPS--------------------*/
const key = fs.readFileSync(process.env.KEY_PATH);
const cert = fs.readFileSync(process.env.CERT_PATH);
const cred = {
	key,
	cert
      };
const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443, () => {console.log(`https server live on port:8443`)});

//--------------------MIDDLEWARE--------------------*/
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

//--------------------ROUTES--------------------*/
app.listen(3000, () => {
  console.log('listening to http://localhost:3000');
})

app.get('/.well-known/pki-validation/A7DC6BA9ED359DF264150C3009144078.txt', (req, res, next) => {
  res.sendFile(process.env.VALID_PATH)
  next(err);
})

app.use('/cloudinary', cloudinary);
