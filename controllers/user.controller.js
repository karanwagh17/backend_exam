const UserModel = require("../model/user.model");

const user = {
  register: async (req, res) => {
    const { name, email, password, age, city } = req.body;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!name || !email || !password || !age || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if (!uppercaseRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
    }
    if (!numberRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one number" });
    }
    if (!specialCharRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one special character" });
    }
    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await UserModel.create({
        name,
        email,
        password,
        age,
        city,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
};
module.exports = user;
