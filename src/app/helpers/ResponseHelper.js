module.exports = async ({ response, success = true, status = 200, message }) => {
  response.status(status).json({ success, message });
};
