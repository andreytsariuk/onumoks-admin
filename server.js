const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
app = express()
app.use(serveStatic(__dirname))
const port = process.env.PORT || 5000
app.listen(port);
app.use((req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});
console.log('server started ' + port)