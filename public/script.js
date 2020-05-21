document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  //static ready = fetch("/CustomWindow.html").then(d => d.text());
  static templateURL = "/CustomWindow.html";
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    this.loadTemplate();
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