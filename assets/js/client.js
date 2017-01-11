var sharedb = require('sharedb/lib/client');
var otText = require('ot-text');
var CodeMirror = require('codemirror');
var ShareDBCodeMirror = require('sharedb-codemirror');
require('codemirror/mode/javascript/javascript.js');

sharedb.types.map['json0'].registerSubtype(otText.type);

var editorElem = document.getElementById('editor');
var editor = CodeMirror.fromTextArea(editorElem, {
  mode: "javascript"
});

var socket = new WebSocket("ws://" + location.host);
var shareConnection = new sharedb.Connection(socket);

var doc = shareConnection.get('users', 'jane');

ShareDBCodeMirror.attachDocToCodeMirror(doc, editor, {
  key: 'content',
  verbose: true
});
