var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
app = express()
app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port);
app.use((req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});
console.log('server started ' + port)