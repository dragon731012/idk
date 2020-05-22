var myWin;
$(function() {
  $('head').append('<link rel="stylesheet" href="/CustomWindow.css">');
  myWin = new CustomWindow();
});

function makeDragable(elmnt, handle=undefined) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (handle != undefined) {
    // if present, the header is where you move the DIV from:
    handle.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

class CustomWindow {
  static tmeplate = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0, {left=null, right=null, name="", icon="", groupWith="CustomWindow"} = {}) {
    this.width = width;
    this.height = height;
    this.init = (async () => {
      this.win = $(await CustomWindow.tmeplate).appendTo('body');
      this.width = width;
      this.height = height;
      this.toggleSize();
      var appinfo = this.win.find('.appinfo');
      makeDragable(this.win[0], appinfo[0]);
      this.name = $().text.bind(appinfo);
      this.name(name);
    })();
  }
  
  minimise() {
    
  }
  
  toggleSize() {
    this.win.css({width: (this.width ? this.width : '100%'), height: (this.height ? this.height : '100%')});
  }
  
  close() {
    this.win.remove()
  }

  dragMouseDown(x, y) {
    
  }
}

class BrowserWindow extends CustomWindow {
  static template = fetch("/index.html").then(d => d.text())
  static stylesheet;
  
  constructor(width=0, height=0) {
    var parent = super(width, height);
    if (!BrowserWindow.stylesheet) BrowserWindow.stylesheet = !!$('head').append('<link rel="stylesheet" href="/BrowserWindow.css">');
    this.init = (async () => {
      await parent.init;
      return await BrowserWindow.template;
    })();
  }
  
  showBookmarks() {
    
  }
  
  restoreTabs() {
    
  }
  
  newTab() {
    
  }
}

class PopupWindow extends CustomWindow {
  constructor(width=0, height=0) {
    super(100, 100);
  }
}