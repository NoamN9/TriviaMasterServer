const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require('./controllers/register');
const login = require('./controllers/login');
const points = require('./controllers/points');


const db =knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : '',
    database : 'postgres'
  }
});



app.use(bodyParser.json());
app.use(cors());



app.post("/login",(req,res) => {login.handleLogin(req,res,db,bcrypt)} );

app.post("/register",(req,res) => {register.handleRegister(req,res,db,bcrypt)});

app.put('/points',(req,res) => {points.updatePoints(req,res,db)})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

