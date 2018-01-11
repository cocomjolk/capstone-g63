const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))



//created var for routes, used in app.use
//let patients = require('./routes/patients')
let rewards = require('./routes/rewards')
let doctors = require('./routes/doctors')
let videos = require('./routes/videos')
let users = require('./routes/users')

app.get('/',function(req,res){
  res.sendFile(`${__dirname}/index.html`)
})

//incoming request from client, goint to routes in routes folder.
//app.use('/api/patients', patients);
//app.use('/api/rewards', rewards);
app.use('/api/doctors', doctors);
app.use('/api/users', users);



app.listen(PORT);
console.log('app.js server listening on port' + PORT);

module.exports = app;
