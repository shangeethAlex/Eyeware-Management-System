const errorMiddleware = (err, req, res, next) => {
  console.log("Here is the error: ");
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : "🥞",
  });
};

module.exports = errorMiddleware;
