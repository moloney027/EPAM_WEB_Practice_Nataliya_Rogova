var io = require("socket.io-client");
var socket = io.connect("https://voicy-speaker.herokuapp.com/");
socket.on("connect", function () {
  console.log("Client has connected to the server!");
});
module.exports = { socket: socket };
