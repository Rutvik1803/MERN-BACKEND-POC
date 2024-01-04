import mongoose from "mongoose";

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@mern-auth.lxqnkhe.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URL);

    console.log("Connected Successfully!");
  } catch (error) {
    console.log(error);
  }
};

export default Connection;
