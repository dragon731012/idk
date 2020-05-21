document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  
  templateURL = "/CustomWindow.html";
  ready = fetch(templateURL).then(d => d.text());
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    
    
    this.ready = Promise.all(fetch(this.templateURL).then(d => d.text()));
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