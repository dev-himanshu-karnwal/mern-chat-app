exports.addUserSocketId = (req, res, next) => {
  const { io, user, userSocketIdMapping } = req;

//   io.on("connection", (socket) => {
    console.log("socket id:", req.headers['x-socket-id']);
//   });

  next();
};
