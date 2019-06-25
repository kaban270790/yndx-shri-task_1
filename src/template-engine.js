const TemplateEngine = require('./TemplateEngine/TemplateEngine.js'),
    fs = require('fs'),
    path = require('path');
let dir = path.join(__dirname, '../', 'pages'),
    dir2 = path.join(__dirname, '../', 'build');
fs.readdir(dir, function (err, list) {
    if (err) {
        return console.error(err);
    }
    let pending = list.length;
    if (!pending) return;
    list.forEach(function (file) {
        let readFileName = path.join(dir, file);
        let writeFileName = path.join(dir2, file.replace(/([a-zA-Z0-9])\.json/i, '$1.html'));
        fs.readFile(readFileName, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let html = TemplateEngine(JSON.parse(data));
            fs.writeFile(writeFileName, html, "utf8", (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
