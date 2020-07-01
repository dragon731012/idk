export default function() {
const img = document.createElement('img');
var io;  // Nessisary to prevent Glitch.com warnings
const socket = io();

socket.on('update', function(data) {
  console.debug("RECIEVED", (data.length || data.byteLength) / 1000, 'kb');
  img.src = 'data:image/jpeg;base64,' + data;
});

img.onclick = ev => {
  console.debug("CLICKED");
  socket.emit('click', {x: ev.clientX, y: ev.clientY});
};
  
img.onmousemove = ev => {
  socket.emit('move', {x: ev.clientX, y: ev.clientY});
};

img.onwheel = ev => {
  //console.debug("SCROLL");
  socket.emit('scroll', { x: ev.deltaX, y: ev.deltaY });
}

document.onkeydown = ev => {
  console.log("KEYPRESS", ev.key);
  socket.emit('keydown', ev.code);
};

document.onkeyup = ev => {
  socket.emit('keyup', ev.code);
};

window.onresize = function(ev) {
  console.debug("RESIZED");
  socket.emit('resize', {width: window.innerWidth, height: window.innerHeight});
}
  
socket.on('meta', function(data) {
  console.log(data);
  document.title = data.title;
  document.querySelector('link[rel=icon]').href = data.icon;
});
  
socket.on('dialog', function(dialog) {
  console.debug(dialog);
  window.beforeunload = confirm.bind(window, "Leave site?\nChanges you made may not be saved");
  socket.emit('closeDialog', window[dialog.type](dialog.message));
});

socket.on('connect', function(data) {
  console.debug("CONNECTED");
  socket.emit("navigate", 'https://wikipedia.org');
  window.onresize();
});
  
return img;
}