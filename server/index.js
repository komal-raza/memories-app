import express from "express"; // as a framework for routing
import cors from "cors"; //send cors requests
import bodyParser from "body-parser"; //send post requests from client to server
import mongoose from "mongoose"; // to create models for our posts
import dotenv from "dotenv"; // to read .env file

import postRoutes from "./routes/posts.js";

import userRoutes from "./routes/user.js";

const app = express(); //initialize app to use this instance
dotenv.config();

app.use(express.json());

//Setup bodyparser to send requstrs from client to server
app.use(bodyParser.json({ limit: "10mb", extended: true })); //limit size of post image request
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const corsOptions = {
  origin: "*",
  noCors: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/posts", postRoutes); //starting path for posts routes
app.use("/user", userRoutes); //User login path

app.get("/", (req, res) => {
  res.send("Memo Post App API says hello");
});

const PORT = 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log("Connected to mongodb successfully");

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err.message));
