// server logic
const http = require("http");

const database = require("./database.json")

const hostname = "localhost";
const port = 3000;

function NotFoundResponse(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found!");
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  switch (req.method) {
    case "GET":
      var data = JSON.parse(database)
      res.end(data);
      break;
    case "POST":
      console.log("POST method ...");
      res.end();
      break;
    case "PUT":
      console.log("PUT method ...");
      res.end();
      break;
    default:
      NotFoundResponse(res)
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening ${hostname}:${port}`);
});
