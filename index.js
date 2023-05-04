const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//all middlewares
app.use(express.json());
app.use(cors());

//database connecting
const connectionString =
  "mongodb+srv://himanshu:himanshu@astro.rmlxmo4.mongodb.net/?retryWrites=true&w=majority";
const compass = "mongodb://0.0.0.0:27017";
const connectDB = async () => {
  try {
    mongoose.connect(compass, {
      useNewUrlParser: true,
    });
    console.log("mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Number,
  },
  mob: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", schema);

//get all users

app.get("/submitted", (req, res) => {
  res.send("<h1>Your information has been saved </h1>");
});
//create a new User
app.post("/", (req, res) => {
  const{name,email,age,mob}=req.body;
  try {
    User.create({
      name,
      email,
      age,
      mob,
    });
    console.log(name,email,age,mob);
    
    
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log("Server started at port 3000...");
  });
});
