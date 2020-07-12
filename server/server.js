const path = require("path");
const express = require("express");
const cors = require('cors');
const app = express(),
  DIST_DIR = __dirname,
  HTML_FILE = path.join(DIST_DIR, "../client/src/index.html");

const PORT = process.env.PORT || 3000;

app.use(express.static(DIST_DIR));
app.use(cors());

app.get("*", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
