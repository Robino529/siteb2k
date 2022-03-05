const fs = require('fs');
const season = fs.readFileSync("season.txt", "utf8").trim();
document.write(season);