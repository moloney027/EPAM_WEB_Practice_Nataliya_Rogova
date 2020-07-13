const path = require("path"),
  express = require("express"),
  cors = require("cors"),
  app = express(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "../client/src/index.html"),
  PORT = process.env.PORT || 3000,
  voices = [];

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

server.listen(PORT, () => {
  console.log(`app listening to ${PORT}....`);
  console.log("press Ctrl+C to quit.");
});

app.get("/voices", (req, res) => {
  res.send(voices);
});

io.on("connection", (socket) => {
  let countCon = socket.client.conn.server.clientsCount;
  console.log(countCon + " users connected");
  console.log("a user connected: " + socket.id);
  io.emit("user", countCon);
  socket.on("disconnect", () => {
    let countDis = socket.client.conn.server.clientsCount;
    console.log(countDis + " users connected");
    console.log(socket.id + " has disconnected");
    io.emit("user", countDis);
  });

  socket.on("audioMessage", (audio) => {
    voices.push({ timeStamp: new Date().toISOString(), audioBlob: audio });
    io.emit("audioMessage", audio);
    console.log("audioMessage sent");
  });
});
