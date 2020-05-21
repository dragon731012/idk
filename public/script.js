document.onload = function() {
  new BrowserWindow();
};

class CustomWindow {
  static bla = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    
    
    this.tasks = [];
  }

  async ready() {
    // await super.ready()
    var template = await bla;
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
  static tasks = [];
  
  //this.tasks.push();
  //static ready = Promise.all([fetch(this.templateURL).then(d => d.text()), super.ready]);

  constructor(width=0, height=0) {
    super(width, height)
    //tasks.push(fetch(this.templateURL).then(d => d.text()))
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