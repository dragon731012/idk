const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(function(req, res, next) {
  var url = req.url.split('.');
  console.log(url[url.length-1])
  express.static("public")(req, res, next);
  next();
});

/* https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  //response.redirect('/index.html');
  response.sendFile(__dirname + "/views/index.html");
});*/


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});