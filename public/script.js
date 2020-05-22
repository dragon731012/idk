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
      this.width = width;
      this.height = height;
      this.toggleSize()
      this.name = $().text.bind(this.win.find('.appinfo'));
      this.name(name);
    })();
  }
  
  minimise() {
    
  }
  
  toggleSize() {
    this.win.css({width: (this.width ? this.width : '100%'), height: (this.height ? this.height : '100%')});
  }
  
  close() {
    this.win.remove()
  }
}

class BrowserWindow extends CustomWindow {
  static template = fetch("/index.html").then(d => d.text())
  static stylesheet;
  
  constructor(width=0, height=0) {
    var parent = super(width, height);
    if (!stylesheet) stylesheet = $('head').append('<link rel="stylesheet" href="/BrowserWindow.css">');
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