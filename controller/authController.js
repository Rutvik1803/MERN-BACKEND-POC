const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupController = async (req, res, next) => {
  const { fname, lname, email, pass } = req.body;
  const hashedPassword = bcryptjs.hashSync(pass, 10); // Encrypting Password
  try {
    const newUser = new User({
      firstname: fname,
      lastname: lname,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "Data added to Database Successfully!",
    });
  } catch (error) {
    next(error); //Middleware calling
  }
};

const signInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) res.status(404).json("User not found");
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) res.status(401).json("Invalid Credentials");

    const token = jwt.sign({ id: validUser._id }, "mernproject");
    const expiryDate = new Date(Date.now() + 3600000); //1 hour
    const { password: hashedPassword, ...rest } = validUser._doc; // for password hiding if sending the whole data in response
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      // .json(
      //   `Welcome ${validUser.firstname} ${validUser.lastname}, ${expiryDate}`
      // );
      .json(rest); //removed the password
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  signInController,
};
