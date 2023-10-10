module.exports = async ({ response, success = true, status = 200, data = null }) => (
  response.status(status).json({ success, data })
);
