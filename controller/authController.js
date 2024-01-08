const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");

const authController = async (req, res, next) => {
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

module.exports = authController;
