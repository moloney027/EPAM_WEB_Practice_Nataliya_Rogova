const { socket } = require("./client.js");
var mode = new Boolean(false);
var mediaRecorder;

function action1() {
  let response = document.getElementById("response");
  let output = "Active: voices list";
  response.innerHTML = output;
}
document.getElementById("bar").addEventListener("click", action1);

function action2() {
  let response = document.getElementById("response");
  let output = "Active: speaker-mode";
  response.innerHTML = output;
}
document.getElementById("micr").addEventListener("click", action2);

document.getElementById("micr").addEventListener("mousedown", myFunc);

function myFunc() {
  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function (e) {
      console.log("(on) Recording started!");
    };

    mediaRecorder.ondataavailable = function (e) {
      console.log("(on) Sending data");
      socket.emit("audioMessage", e.data);
    };

    mediaRecorder.onstop = function (e) {
      console.log("(on) Recording stop!");
    };

    mediaRecorder.start();

    document.getElementById("micr").addEventListener("mouseup", funcStop);

    function funcStop() {
      mediaRecorder.stop();
      console.log("Recording Complete!");
    }
  });
}

function action3() {
  let response = document.getElementById("response");
  let output = "Active: listener-mode";
  response.innerHTML = output;
}
document.getElementById("mus").addEventListener("click", action3);
