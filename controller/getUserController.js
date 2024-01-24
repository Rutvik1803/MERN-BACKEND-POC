const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

const getUser = async (req, res) => {
  res.status(200).json({
    data: {
      name: "Rutvik",
      age: "24",
    },
  });
};

const updateUserController = async (req, res) => {
  if (req.user.id !== req.params.id)
    return res.status(401).json("You can update your account only");

  try {
    // If the user changes the password
    if (req.body.formData.password) {
      hashedPassword = bcryptjs.hashSync(req.body.formData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstname: req.body.formData.firstName,
          lastname: req.body.formData.lastName,
          email: req.body.formData.email,
          password: hashedPassword,
        },
      },
      { new: true } // If not added, we will get the previous data
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {}
};

module.exports = { getUser, updateUserController };
