$(function() {
  $('head').append('<link rel="stylesheet" href="/CustomWindow.css">');
  new CustomWindow();
});

class CustomWindow {
  static tmeplate = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0) {
    this.width = width;
    this.height = height;
    this.init = (async () => {
      $(await CustomWindow.tmeplate).appendTo('body')
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
      return await BrowserWindow.template;
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