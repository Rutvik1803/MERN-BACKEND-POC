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

const googleController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "mernauth");
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        firstname: req.body.fname,
        lastname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        profilePhoto: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "mernauth");
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  signInController,
  googleController,
};
