document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  static templateURL = "/CustomWindow.html";
  static ready = Promise.all([fetch(this.templateURL).then(d => d.text()), super.ready]);
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    
    
  }
  
  minimise() {
    
  }
  
  maximise() {
    
  }
  
  close() {
    
  }
}

class BrowserWindow extends CustomWindow {
  static templateURL = "/index.html";
  static ready = Promise.all([fetch(this.templateURL).then(d => d.text()), super.ready]);

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