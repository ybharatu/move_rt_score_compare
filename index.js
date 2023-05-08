const express = require('express');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//console.log(process.env.OMDB_KEY);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000, function() {
  console.log('Server listening on port 3000');
});
