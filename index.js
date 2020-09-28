const express = require('express');
const app = express();

const route = require('./routes/urls');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/TODO', { useUnifiedTopology: true,  useNewUrlParser: true  },()=>{
    console.log('---> DATABASE CONNECTED <---');
});

app.use(bodyParser.urlencoded({
    extended: true 
}));

app.use(bodyParser.json());

app.use('/todo', route);


app.listen(3000, ()=>{
    console.log('server start at 3000');
});


