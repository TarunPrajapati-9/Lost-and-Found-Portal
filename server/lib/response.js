const sendResponse = (res, success, message, data = {}, statusCode = 200) => {
  res.status(statusCode).json({ success, message, data });
};

export default sendResponse;
