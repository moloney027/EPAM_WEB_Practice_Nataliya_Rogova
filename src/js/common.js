function action1() {
  (response = document.getElementById("response")),
    (output = "Active: voices list");
  response.innerHTML = output;
}
document.getElementById("bar").onclick = action1;

function action2() {
  // отображение режима speaker-mode
  (response = document.getElementById("response")),
    (output = "Active: speaker-mode");
  response.innerHTML = output;

  // запись и отправка голосового сообщения
  var constraints = { audio: true };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    const mediaRecorder = new MediaRecorder(mediaStream);
      
    mediaRecorder.ondataavailable = function(e) {
      console.log("sending data");
      socket.emit("audioMessage", e.data);
    };
  
    mediaRecorder.start();
  
    // завершить через 3 секунды
    setTimeout(function() {
      mediaRecorder.stop();
      console.log("Запись завершена!");
    }, 3000);

    // другой вариант
    // mediaRecorder.onstart = function (e) {
    //   this.chunks = [];
    // };
    // mediaRecorder.ondataavailable = function (e) {
    //   this.chunks.push(e.data);
    // };
    // mediaRecorder.onstop = function (e) {
    //   var audioChunks = new Blob(this.chunks, {
    //     type: "audio/ogg; codecs=opus",
    //   });
    //   socket.emit("audioMessage", audioChunks);
    // };
    // mediaRecorder.start();
    // setTimeout(function () {
    //   mediaRecorder.stop();
    //   console.log("Запись завершена!");
    // }, 3000);
  
  });
}
document.getElementById("micr").onclick = action2;

function action3() {
  (response = document.getElementById("response")),
    (output = "Active: listener-mode");
  response.innerHTML = output;
}
document.getElementById("mus").onclick = action3;
