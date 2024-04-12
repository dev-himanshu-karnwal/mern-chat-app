exports.attachIO = (io, userSocketIdMapping) => (req, res, next) => {
  req.io = io;
  req.userSocketIdMapping = userSocketIdMapping;
  return next();
};
