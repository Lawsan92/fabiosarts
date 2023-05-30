const express = require('express');
const path = require('path');


//--------------------SERVER--------------------*/
const app = express();

//--------------------MIDDLEWARE--------------------*/
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist/')));

//--------------------ROUTES--------------------*/

app.listen(3000, () => {
  console.log('listening to http://localhost:3000');
})