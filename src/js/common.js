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

  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    const mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.ondataavailable = function (e) {
      console.log("sending data");
      socket.emit("audioMessage", e.data);
    };

    mediaRecorder.start();

    setTimeout(function () {
      mediaRecorder.stop();
      console.log("Запись завершена!");
    }, 3000);
  });
}
document.getElementById("micr").onclick = action2;

function action3() {
  (response = document.getElementById("response")),
    (output = "Active: listener-mode");
  response.innerHTML = output;
}
document.getElementById("mus").onclick = action3;
