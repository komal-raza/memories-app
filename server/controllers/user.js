import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserProfile from "../models/userProfile.js";

export const getUsers = async (req, res) => {
  try {
    // Serach * from PostMessage document
    const data = await UserProfile.find();

    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(404).json({ messge: "No user found" });
    console.log(err.message);
  }
};

export const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existData = await UserProfile.findOne({ email });
    if (!existData) return res.status(404).json({ message: "User doesn't exist" });
    
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existData?.password
    );
    if (!isPasswordCorrect) res.status(400).json({ message: "Incorrect credentials" });

    const token = jwt.sign(
      { email: existData?.email, id: existData?._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existData, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error.message);
  }
};

export const signupUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // await newUser.save();

    const existingUser = await UserProfile.findOne({ email });
    if(existingUser) return res.status(400).json({ message: "userData existed" });

    // encrypt password
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await UserProfile.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    console.log("user data", newUser);
    const token = jwt.sign({ email: newUser?.email, id: newUser._id }, "test", {
      expiresIn: "1h",
    });
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
