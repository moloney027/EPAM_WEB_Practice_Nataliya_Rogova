var io = require("socket.io-client");
//var socket = io.connect("https://voicy-speaker.herokuapp.com/");
var socket = io.connect("http://localhost:3000");
socket.on("connect", function () {
  console.log("Client has connected to the server!");
});
module.exports = { socket: socket };
