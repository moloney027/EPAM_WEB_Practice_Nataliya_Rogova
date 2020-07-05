function action1() {
  (response = document.getElementById("response")),
    (output = "Active: voices list");
  response.innerHTML = output;
}
document.getElementById("bar").onclick = action1;

function action2() {
  (response = document.getElementById("response")),
    (output = "Active: speaker-mode");
  response.innerHTML = output;
}
document.getElementById("micr").onclick = action2;

function action3() {
  (response = document.getElementById("response")),
    (output = "Active: listener-mode");
  response.innerHTML = output;
}
document.getElementById("mus").onclick = action3;
