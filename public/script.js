document.onload = function() {
  new BrowserWindow();
};

class BrowserWindow {
  constructor(width=0, height=0) {
    
  }
}

class PopupWindow extends BrowserWindow {
  constructor() {
    super(100, 100);
  }
}