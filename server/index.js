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

const corsOptions = {
  origin: "http://localhost:3000",
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
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));

console.log("Connected to mongodb successfully");
