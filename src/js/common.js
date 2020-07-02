let count = 0;
function functionClick() {
  count+=1;
  console.log("Click");
  document.getElementById("cl").innerHTML = count;
 }

 document.getElementsByTagName("body")[0].onclick = functionClick