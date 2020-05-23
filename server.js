const express = require("express");
const sass = require("node-sass");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.get('/*', function(req, res, next) {
  var url = req.url.split('.');
  var filename = req.url.split('/');
  console.log(url[url.length-1]);
  if (url[url.length-1] == 'scss') {    
    res.send(sass.renderSync({
      file: __dirname + '/public/' + filename[filename.length-1],
      indentWidth: 0
    }).css);
    res.contentType("text/css");
  } else
    express.static("public")(req, res, next);
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  //response.redirect('/index.html');
  response.sendFile(__dirname + "/public/index.html");
});


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});