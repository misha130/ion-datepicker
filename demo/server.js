var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("www"));
app.listen(process.env.PORT || 5000);