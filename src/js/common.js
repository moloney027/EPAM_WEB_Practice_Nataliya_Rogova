const { socket } = require("./client.js");
var mode = new Boolean(false);

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

document.getElementById("micr").addEventListener("click", funcRecord);

function funcRecord() {
  if (mode == false) {
    mode = true;
    var constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        const mediaRecorder = new MediaRecorder(mediaStream);

        mediaRecorder.onstart = function (e) {
          console.log("Recording started!");
        };

        mediaRecorder.ondataavailable = function (e) {
          socket.emit("audioMessage", e.data);
        };

        mediaRecorder.onstop = function (e) {
          console.log("Recording stop!");
        };

        mediaRecorder.start();

        document
          .getElementById("micr")
          .addEventListener("click", () => mediaRecorder.stop(), {
            once: true,
          });
      });
  } else {
    mode = false;
  }
}

function action3() {
  let response = document.getElementById("response");
  let output = "Active: listener-mode";
  response.innerHTML = output;
}
document.getElementById("mus").addEventListener("click", action3);
