const express = require('express');
const path = require('path');
const cloudinary = require('./routes/cloudinary.js');
<<<<<<< HEAD
const fs = ('fs');
=======
const fs = require('fs');
const https = require('https');
>>>>>>> refs/remotes/origin/main

//--------------------SERVER--------------------*/
const app = express();

//-------------------HTTPS--------------------*/
const key = fs.readFileSync('/home/ubuntu/fabiosarts/auth/private.key');
const cert = fs.readFileSync('/home/ubuntu/fabiosarts/auth/certificate.crt');
const cred = {
	key,
	cert
      };
const httpsServer = https.createServer(cred, app);
httpsServer.listen(8443, () => {console.log(`https server live on port:8443`)});

// https.createServer(cred, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// }).listen(8080);

//--------------------MIDDLEWARE--------------------*/
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

//--------------------ROUTES--------------------*/
app.listen(3000, () => {
  console.log('listening to http://localhost:3000');
})

<<<<<<< HEAD
app.get('/.well-known/pki-validation/A7DC6BA9ED359DF264150C3009144078.txt', () => {
  res.sendFile('/Users/lawrence/fabiosarts/A7DC6BA9ED359DF264150C3009144078.txt')
=======
app.get('/.well-known/pki-validation/A7DC6BA9ED359DF264150C3009144078.txt', (req, res, next) => {
  res.sendFile('/home/ubuntu/fabiosarts/auth/A7DC6BA9ED359DF264150C3009144078.txt')
  next(err);
>>>>>>> refs/remotes/origin/main
})

app.use('/cloudinary', cloudinary);
