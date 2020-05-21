document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  static tmeplate = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    this.init = (async () => {
      return await CustomWindow.tmeplate;
    })();
  }
  
  minimise() {
    
  }
  
  maximise() {
    
  }
  
  close() {
    
  }
}

class BrowserWindow extends CustomWindow {
  static template = fetch("/index.html").then(d => d.text())
  
  constructor(width=0, height=0) {
    var parent = super(width, height);
    this.init = (async () => {
      console.log(await parent.init);
      return await BrowserWindow.tmeplate;
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