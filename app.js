const express = require("express");
const mongoose = require("mongoose");
const app = express();

//all middlewares
app.use(express.json());

//database connecting
const connectionString =
  "mongodb+srv://himanshu:himanshu@astro.rmlxmo4.mongodb.net/?retryWrites=true&w=majority";
const compass = "mongodb://localhost:27017";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log(e);
  });

const schema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
  },
  check: {
    type: Boolean,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", schema);

//get all users
// app.get("/", (req, res) => {
//   res.send("Hello I am fine!");
// }

//create a new User
app.post("/", (req, res) => {
  try {
    User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      email: req.body.email,
      age: req.body.age,
      Address: req.body.Address,
      check: req.body.check,
    });
    res.send("created");
    console.log("done");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
});


app.listen(3000, (req, res) => {
  console.log("Server started at port 3000...");
});
