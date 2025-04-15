import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No token provided.",
      data: {},
    });
  }

  try {
    const secretKey = "SECRET_KEY"; // replace with your `.env` value in real project
    const verified = jwt.verify(token.replace("Bearer ", ""), secretKey);
    req.user = verified;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Invalid Token",
      data: { error: err.message },
    });
  }
};

export default auth;
