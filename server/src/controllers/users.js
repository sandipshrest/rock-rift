const User = require("../models/user");

const registerNewUser = async (req, res) => {
  try{
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists." });
    } else {
      await User.create(req.body);
      res.status(201).json({ message: "registered successfully!" });
    }
  }catch(err){
    console.log(err)
  }
};

module.exports = { registerNewUser };
