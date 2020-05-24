var myWin;
$(function() {
  $('head').append('<link rel="stylesheet" href="/CustomWindow.scss">');
  myWin = new BrowserWindow();
});

class CustomWindow {
  static template = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0, {left=null, right=null, name="", icon="", groupWith="CustomWindow"} = {}) {
    this.width = width;
    this.height = height;
    this.init = (async () => {
      this.win = $(await CustomWindow.template).appendTo('body');
      this.fullscreen = width && height;
      this.width = width ? width : 100;
      this.height = height ? height : 100;
      this.toggleSize();
      var appinfo = this.win.find('.appinfo');
      this.makeDragable(this.win[0], appinfo[0]);
      this.name = $().text.bind(appinfo);
      this.name(name);
      
      // Register functionalities
      this.win.find('button[title="Close"]').click(this.close.bind(this));
    })();
  }
  
  minimise() {
    
  }
  
  toggleSize() {
    this.fullscreen = !this.fullscreen;
    this.win.css({width: (this.fullscreen ? '100%' : this.width), height: (this.fullscreen ? '100%' : this.height)});
  }
  
  close() {
    this.win.remove()
  }

  makeDragable(elmnt, handle=undefined) {
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
    console.log(this)
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
}

class BrowserWindow extends CustomWindow {
  static template = fetch("/BrowserWindow.html").then(d => d.text())
  static stylesheet;
  
  constructor(width=0, height=0) {
    var parent = super(width, height);
    if (!BrowserWindow.stylesheet) BrowserWindow.stylesheet = !!$('head').append('<link rel="stylesheet" href="/BrowserWindow.scss">');
    this.init = (async () => {
      await parent.init;
      $(await BrowserWindow.template).appendTo(this.win);
      this.win.addClass('BrowserWindow');
      
      // Register functionalities
      this.win.find('.searchbox').on('keydown', function(ev) {if(ev.key === 'Enter') console.log(ev.target.value); });
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