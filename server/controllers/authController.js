import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendResponse from "../lib/response.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendResponse(res, false, "All fields are required", {}, 400);
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      const message =
        existingUser.username === username
          ? "Username already exists"
          : "Email already exists";
      return sendResponse(res, false, message, {}, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return sendResponse(
      res,
      true,
      "User registered successfully",
      { userId: newUser._id, username: newUser.username, email: newUser.email },
      201
    );
  } catch (err) {
    return sendResponse(
      res,
      false,
      "Server Error",
      { error: err.message },
      500
    );
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendResponse(
        res,
        false,
        "Username and Password are required",
        {},
        400
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, false, "User not found", {}, 404);
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return sendResponse(res, false, "Invalid password", {}, 401);
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    return sendResponse(res, true, "Login successful", { token });
  } catch (err) {
    return sendResponse(
      res,
      false,
      "Server Error",
      { error: err.message },
      500
    );
  }
};
