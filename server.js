const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = 'localhost';
const port = 3000;
const secret = fs.readFileSync("secret.txt", "utf8").trim();
const server = http.createServer((req, res) => {
    if(req.method === "POST" && req.url === "/app/setSeason"){
        res.setHeader('Content-Type', 'text/plain');
        if(req.headers.authorization.trim() === secret){
            let body = "";
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                const files = fs.readdirSync("/root/pages/");
                files.forEach(function (file) {
                        if(file.endsWith(".html")){
                            const data = fs.readFileSync(path.join("/root/pages/",file), 'utf8');
                            const result = data.replace(/NOM_SAISON/g, body);
                            const name = path.basename(file)
                            fs.writeFileSync(path.join("/var/www/play.timoreo.fr/html/", name), result, 'utf8');
                        }else{
                            const name = path.basename(file);
                            fs.copyFileSync(path.join("/root/pages/",file),path.join("/var/www/play.timoreo.fr/html/",name));
                        }
                });
                res.statusCode = 200;
                res.end("Success\n");
            });
        }else{
            console.log(secret);
            console.log(req.headers.authorization);
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

