const http = require('http');
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const secret = fs.readFileSync("secret.txt", "utf8").trim();
const server = http.createServer((req, res) => {
  if(req.method === "POST" && req.url === "/app/setSeason"){
    res.setHeader('Content-Type', 'text/plain');
    if(req.headers.authorization.trim() === secret){
      try {
        fs.writeFileSync("season.txt", req.body);
        res.statusCode = 200;
        res.end("Success\n");
      }catch (e) {
        res.statusCode = 500;
        res.end("Error while writing file\n");
      }
    }else{
      res.statusCode = 403;
      res.end("No.\n");
    }

  }else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bro do you even\n');
  }
});
server.listen(port, hostname, () => { 
console.log(`Server running at http://${hostname}:${port}/`);
});
