const { socket } = require("./client.js");

function action1() {
  var response = document.getElementById("response");
  var output = "Active: voices list";
  response.innerHTML = output;
}
document.getElementById("bar").onclick = action1;

function action2() {
  var response = document.getElementById("response");
  var output = "Active: speaker-mode";
  response.innerHTML = output;
}
document.getElementById("micr").onclick = action2;

document.getElementById("micr").addEventListener("click", myFunc);

function myFunc() {
  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    const mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function (e) {
      console.log("(on) Recording started!");
    };

    mediaRecorder.ondataavailable = function (e) {
      console.log("(on) Sending data");
      socket.emit("audioMessage", e.data);
    };

    mediaRecorder.onstop = function (e) {
      console.log("(on) Recording started!");
    };

    mediaRecorder.start();

    document.getElementById("micr").addEventListener("contextmenu", funcStop);

    function funcStop() {
      mediaRecorder.stop();
      console.log("Recording Complete!");
    }
  });
}

function action3() {
  var response = document.getElementById("response");
  var output = "Active: listener-mode";
  response.innerHTML = output;
}
document.getElementById("mus").onclick = action3;
