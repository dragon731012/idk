module.exports = function(app) {

const puppeteer = require('puppeteer'),
    http = require('http').createServer(app),
    io = require('socket.io')(http);

var browserWait, userCount = 0;


(async () => {
  browserWait = puppeteer.launch({
    args: ['--no-sandbox']
  });
  var browser = await browserWait;
  console.log("BROWSER OPEN");
  
  browser.on("targetcreated", async (target)=>{  // prevent excessive tabs from opening
    console.log("target created", userCount, (await browser.pages()).length - 1)
    const page=await target.page();
    if(page && userCount < (await browser.pages()).length - 1) { console.log("CLOSING extra tabs"); page.close(); }
  });
})();

io.on('connection', async socket => {
  userCount++;
  console.log('User connected:', socket.id);
  var page, pageWait, interval;
  browserWait.then(async browser => {
    pageWait = browser.newPage();
    page = await pageWait;
    
     page.on('popup', page => {
      socket.emit('popup', page.url());
      page.close();
    });
    
    page.on('dialog', async dialog => {
      socket.emit('dialog', {type: dialog.type(), message: dialog.message()});
      socket.on('closeDialog', async msg => { await dialog.accept(String(msg)); dialog.dismiss(); socket.off('closeDialog'); });
    });
    //page.evaluate(() => alert('1'));
  
    page.on('load', async () => {
      socket.emit('meta', {
        title: await page.title(),
        icon: await page.$$eval('link[rel]', elems => elems.find(i => i.relList.contains('icon')).href)
      });
    });
    
    // create new tab & send every interval
    //interval = setInterval(update, 1000);
  });
  var lastRequest = new Date().getTime();
  var closeCountdown;
  
  async function update() {
    //lastRequest = new Date().getTime();
    console.log("SENDING...");
    var startTime = new Date().getTime();
    // TODO: maybe use binary instead of base64 for increased efficency?
    socket.emit('update', await page.screenshot({ fullPage: false, encoding: 'base64', type: 'jpeg', quality: 30 }) );
    console.log("SENT in", new Date() - startTime, 'ms');
    
    // if no interaction within 1 min, stop sending screenshots
    if (startTime - lastRequest > 60000) {
      console.log('PAUSED');
      clearInterval(interval);
      interval = null;
      // close connection in 9 minutes
      closeCountdown = setTimeout(socket.disconnect, 540000);
    }
  }
  
  function interact() {
    lastRequest = new Date().getTime();
    if (interval == null) { console.log("RESUME"); interval = setInterval(update, 1000); }
    if (closeCountdown) {
      clearTimeout(closeCountdown);
      closeCountdown = null;
    }
  }
  
  socket.on('disconnect', () => {
    userCount--;
    console.log('User disconnected');
    clearInterval(interval);
    page.close();
  });
  
  // Actions
  socket.on('navigate', async msg => {
    interact();
    await browserWait;
    await pageWait;
    console.log(`LOADING PAGE (${msg})...`);
    var startTime = new Date();
    await page.goto(msg);
    console.log("LOADED in", new Date() - startTime, 'ms');
  });
  
  socket.on('click', msg => {
    interact();
    page.mouse.click(msg.x, msg.y);
  });
  
  socket.on('move', msg => {
    page.mouse.move(msg.x, msg.y);
  });
  
  socket.on('keydown', msg => {
    interact();
    page.keyboard.down(msg);
    update();
  });
  
  socket.on('keyup', msg => {
    page.keyboard.up(msg);
  });
  
  socket.on('resize', async msg => {
    await browserWait;
    await pageWait;
    page.setViewport({
      width: msg.width,
      height: msg.height,
      deviceScaleFactor: 1
    });
  });
  
  socket.on('scroll', async msg => {
    await page.evaluate(msg => {
      window.scrollBy(msg.x, msg.y);
    }, msg);
    update();
  });
  
  //while (!page.isClosed()) await update();
});
}