var myWin;
$(function() {
  $('head').append('<link rel="stylesheet" href="/CustomWindow.css">');
  myWin = new CustomWindow();
});

class CustomWindow {
  static tmeplate = fetch("/CustomWindow.html").then(d => d.text());
  
  constructor(width=0, height=0, {left=null, right=null, name="", icon="", groupWith="CustomWindow"} = {}) {
    this.width = width;
    this.height = height;
    this.init = (async () => {
      this.win = $(await CustomWindow.tmeplate).appendTo('body');
      this.win.css({width: (width ? width : '100%'), height: (height ? height : '100%')});
      this.name = $().text.bind(this.win.find('.appinfo'));
      this.name(name);
    })();
  }
  
  minimise() {
    
  }
  
  maximise() {
    
  }
  
  close() {
    this.win.remove()
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