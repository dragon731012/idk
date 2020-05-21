document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    
    
    this.tasks = [fetch("/CustomWindow.html").then(d => d.text())];
  }

  ready() {
    return Promise.all(this.tasks);
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
  
  //this.tasks.push();
  //static ready = Promise.all([fetch(this.templateURL).then(d => d.text()), super.ready]);

  constructor(width=0, height=0) {
    super(width, height)
    super.tasks.push(fetch(this.templateURL).then(d => d.text()))
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