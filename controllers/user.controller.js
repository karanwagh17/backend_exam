const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const {sendMail} = require("../utils/email");
require("dotenv").config();

const user = {
  register: async (req, res) => {
    const { name, email, password, age, city } = req.body;

    if (!name || !email || !password || !age || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!uppercaseRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }
    if (!numberRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }
    if (!specialCharRegex.test(password)) {
      return res.status(400).json({
        message: "Password must contain at least one special character",
      });
    }

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        age,
        city,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Create an account first" });
      }

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7m",
      });

      const htmltemplate = await ejs.renderFile(
        __dirname + "/../view/confirm.ejs",
        { name: user.name }
      );
    //   await sendMail(user.email, htmltemplate, "Confirmation Message");
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .status(200)
        .json({
          message: "User logged in successfully",
          user: {
            name: user.name,
            email: user.email,
            age: user.age,
            city: user.city,
          },
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logout: async (req, res) => {
    try {
      res
        .clearCookie("token")
        .status(200)
        .json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = user;
