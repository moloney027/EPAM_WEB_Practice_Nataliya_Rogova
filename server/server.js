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
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});

app.get("/voices", (req, res) => {
  res.send(voices);
});
