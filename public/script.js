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
    super(width, height).init.then(() => this.init = new Promise((res, rej) => {
      res("browser made!")
    }));
  }

  async ready() {
    await super.ready();
    return await BrowserWindow.template;
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