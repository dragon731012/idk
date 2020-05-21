document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  //static ready = fetch("/CustomWindow.html").then(d => d.text());
  //static templateURL = "/CustomWindow.html"
  //static ready = Promise.all(fetch(this.templateURL), super.ready)
  static baseStaticField = 'base static field';
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
  }

  ready() {
    return baseStaticField;
  }
  
  minimise() {
    
  }
  
  maximise() {
    
  }
  
  close() {
    
  }
}

class BrowserWindow extends CustomWindow {
  constructor(width=0, height=0) {
    
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