const express = require('express');
const app  = express();
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const path = require('path');
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv');

dotenv.config();

const _Url = process.env.DATABASE_URL;
console.log(PORT);

app.use(express.json({
    inflate: true,
    limit: '100kb',
    reviver: null,
    strict: true,
    type: 'application/json',
    verify: undefined,
}))

app.use('/uploads',express.static('uploads'))

mongoose.connect(_Url,{ useUnifiedTopology: true,useNewUrlParser: true })
.then(()=>console.log('connected to DB'))
.catch((err)=>console.log(err));

app.use(cookieParser());

app.use(function(req, res, next) { //this is always going to be called
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
}); 

routes(app);

if(process.env.NODE_ENV === 'production' || false)
{
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(_, res) {
    res.sendFile(path.join(__dirname, 'client','build','index.html'));
  })
}


app.listen(PORT,()=>{
 console.log('Server Is Listening ...');
});
