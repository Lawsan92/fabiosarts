const express = require('express');
const path = require('path');
const cloudinary = require('./routes/cloudinary.js');
const fs = ('fs');

//--------------------SERVER--------------------*/
const app = express();

//--------------------MIDDLEWARE--------------------*/
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

//--------------------ROUTES--------------------*/
app.listen(3000, () => {
  console.log('listening to http://localhost:3000');
})

app.get('/.well-known/pki-validation/A7DC6BA9ED359DF264150C3009144078.txt', () => {
  res.sendFile('/Users/lawrence/fabiosarts/A7DC6BA9ED359DF264150C3009144078.txt')
})

app.use('/cloudinary', cloudinary);
