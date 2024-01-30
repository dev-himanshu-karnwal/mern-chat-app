exports.addUserSocketId = (req, res, next) => {
  const { userSocketIdMapping } = req;

  userSocketIdMapping[req.user._id] = req.cookies.socketId;

  next();
};
