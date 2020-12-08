const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
var knex = require('knex');
const { response } = require("express");

const db =knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'd33d41',
    database : 'postgres'
  }
});



app.use(bodyParser.json());
app.use(cors());



app.post("/login", (req, res) => {
  const {email,password} = req.body
  db.select('email','hash').from('login')
  .where('email','=',email)
  .then(data=>{
    const isValid = bcrypt.compareSync(password,data[0].hash);
    if(isValid){
      return db.select('*').from('users')
      .where('email','=',email)
      .then(user=> res.json(user[0]))
      .catch(err=> res.status(400).json('unable to get user'))
    }
    else{
      res.status(400).json('wrong credentials')
    }
  })
  .catch(err=>res.status(400).json('wrond credentials'))
  
});

app.post("/register", (req, res) => {
  const {email,user,password} = req.body
  const hash = bcrypt.hashSync(password)
  db.transaction(trx => {
    trx.insert({
      hash:hash,
      email:email
    })
    .into('login')
    .returning('email')
    .then(loginEmail=> {
      return trx('users')
      .returning('*')
      .insert({
        email: loginEmail[0],
        username:user
    })
    .then((user)=>res.json(user[0]))
  })
  .then(trx.commit)
  .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
});

app.put('/points',(req,res)=>{
  const {id,addedpoint} = req.body;
 
  db('users')
  .where('id','=',id)
  .increment('points',addedpoint)
  .returning('points')
  .then(points => {
    res.json(points[0]);
  })
  .catch(err=>res.status(400).json('unable to get points')) 
})// if i enter wrong id it will return nothing and not a error need to think about it.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

