document.onload = function() {
  new BrowserWindow();
};

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

class CustomWindow {
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