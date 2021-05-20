var http = require("http");
var url = require("url");
const fs = require("fs");

// title 값 지정과 body안에 내용 html로 넣으면 html코드 만들어줌
var templateHTML = function (title, body) {
  return `
  <!DOCTYPE html>

  <html>
    <head>
      <meta charset="utf-8" />
      <title>Yeohang-Ottae-${title}</title>
    </head>
    <body>
    <h1>Yeohang-Ottae</h1>
    ${body}
    </body>
  </html>
  `;
};

var app = http.createServer(function (req, res) {
  var queryData = url.parse(req.url, true).query;
  var pathname = url.parse(req.url, true).pathname; // querystring 무시

  if (pathname === "/") {
    //초기화면
    if (queryData.id === undefined) {
      var outdata = templateHTML(
        "first page",
        `<h3>Hi! Find where you go</h3><a href="?id=1">Start<a>`
      );
      res.writeHead(200);
      res.end(outdata);
    }
    // 질문 화면
    else {
      fs.readFile(`./questions/${queryData.id}`, "utf8", function (err, data) {
        var outdata = templateHTML(`Question-${queryData.id}`, data);
        res.writeHead(200);
        res.end(outdata);
      });
    }
  } else if (pathname === "/destination") {
    var outdata = templateHTML("Destination", "Where you go is ...");
    res.writeHead(200);
    res.end(outdata);
  } else {
    res.writeHead(404);
    res.end("404 not found!");
  }
});

app.listen(80);
