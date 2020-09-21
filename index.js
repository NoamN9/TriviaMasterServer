const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      password: "123456",
    },
    {
      id: "1234",
      name: "Noam",
      email: "noamn99@gmail.com",
      password: "bestpasswordever",
    },
  ],
};




app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(database);  
  });


app.post("/login", (req, res) => {
  const user = {
      name : req.body.user,
      password: req.body.password
  }
  console.log(user)
res.json("succsess");

});

app.post("/register", (req, res) => {
  res.send("add user to database");
});

app.get("/profile/:userid", (req, res) => {
    res.send("bring back user with the mathing id");
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
