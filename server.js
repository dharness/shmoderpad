var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
const PORT = process.env.PORT || 8080;

// Create a web server to serve files and listen to WebSocket connections
var app = express();
app.use(express.static('.tmp/public'));
app.set('view engine', 'ejs');
var server = http.createServer(app);

app.get('/pad', (req, res) => {
  res.render('index')
});


var backend = new ShareDB();
createDoc(startServer);


// Create initial document then fire callback
function createDoc(callback) {
  var connection = backend.connect();
  var doc = connection.get('examples', 'textarea');
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create('', callback);
      return;
    }
    callback();
  });
}

function startServer() {

  // Connect any incoming WebSocket connection to ShareDB
  var wss = new WebSocket.Server({server: server});
  wss.on('connection', function(ws, req) {
    var stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(PORT);
  console.log(`Listening on http://localhost:${PORT}`);
}
