// open a single window
var window = Ti.UI.createWindow({
	backgroundColor:'white'
});
var label = Ti.UI.createLabel();
window.add(label);
window.open();

var TiTouchDB = require('com.obscure.TiTouchDB');

TiTouchDB.addEventListener('TDReplicatorProgressChanged', function(e) {
  Ti.API.info("replication complete");
});

var db = TiTouchDB.databaseNamed('books');
db.open();
// db.replicateDatabase('http://touchbooks.iriscouch.com/books');
var docs = db.getAllDocs({ includeDocs: true });
Ti.API.info(JSON.stringify(docs));

var view = db.viewNamed('')

/*
var doc = db.createRevision({
  foo: 10,
  bar: 'baz'
});
db.putRevision(doc);
var docs = db.getAllDocs({ includeDocs: true });
Ti.API.info(JSON.stringify(docs));

db.close();
*/

