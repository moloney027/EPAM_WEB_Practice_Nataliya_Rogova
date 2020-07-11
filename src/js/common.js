const { socket } = require("./client.js");
var mode = new Boolean(false);
const source = "https://voicy-speaker.herokuapp.com/voices";

// получение списка всех сообщений с сервера (+ отображение режима)
document.getElementById("bar").addEventListener("click", action1);
function action1() {
  let response = document.getElementById("response");
  let output = "Active: voices list";
  response.innerHTML = output;
  funcGetAllVoices(source);
}

// запись и отправка сообщений на сервер (+ отображение режима)
document.getElementById("micr").addEventListener("click", action2);
document.getElementById("micr").addEventListener("click", funcRecord);
function action2() {
  let response = document.getElementById("response");
  let output = "Active: speaker-mode";
  response.innerHTML = output;
}

// воспроизведение всех сообщений с сервера (+ отображение режима)
function action3() {
  let response = document.getElementById("response");
  let output = "Active: listener-mode";
  response.innerHTML = output;
  funcStream();
}
document.getElementById("mus").addEventListener("click", action3);

// для all voices
async function funcGetAllVoices(url) {
  const playlist = document.getElementById("playlist");
  playlist.innerHTML = "";
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", source, true);
  xmlHttp.send();
  xmlHttp.responseType = "json";
  xmlHttp.promise = new Promise((reject) => {
    xmlHttp.onload = function () {
      console.log(xmlHttp.response);
      // все сообщения
      for (let i = 0, len = xmlHttp.response.length; i < len; i++) {
        // когда слишком много сообщений
        // for (let i = 0; i < 15; i++) {
        if (xmlHttp.response[i].audioBlob[0] != undefined) {
          let audioBlob = new Blob([
            new Uint8Array(xmlHttp.response[i].audioBlob[0].data).buffer,
            { type: "audio" },
          ]);
          var myAudio = URL.createObjectURL(audioBlob);
          let li = document.createElement("li");
          var addAudio = `<audio controls> <source src=${myAudio}></audio>`;
          li.innerHTML = addAudio;
          playlist.append(li);
        }
      }
    };
    xmlHttp.onerror = () => reject(xhr.statusText);
  });
}

// для microphone
function funcRecord() {
  if (mode == false) {
    mode = true;
    var constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
      const mediaRecorder = new MediaRecorder(mediaStream);
      var audioChunks = [];
      mediaRecorder.onstart = function (e) {
        console.log("Record started!");
      };
      mediaRecorder.ondataavailable = function (e) {
        audioChunks.push(e.data);
        socket.emit("audioMessage", audioChunks);
        console.log("Record sent!");
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

// для stream
async function funcStream() {
  socket.on("audioMessage", function (audioChunks) {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  });
}
