require('ti-mocha');

var should = require('should');
var utils = require('test_utils');

module.exports = function() {
  var titouchdb = require('com.obscure.titouchdb'),
      manager = titouchdb.databaseManager,
      db;

  describe('database (general)', function() {

    before(function() {
      utils.delete_nonsystem_databases(manager);
      
      // load up the elements db
      utils.install_elements_database(manager);
      db = manager.getDatabase('elements');
    });

    it('must have a documentCount property', function() {
      should(db).have.property('documentCount', 118);
    });
    
    it('must have a lastSequenceNumber property', function() {
      should(db).have.property('lastSequenceNumber', 122);
    });
    
    it('must have a manager property', function() {
      should(db).have.property('manager', manager);
    });
    
    it('must have a name property', function() {
      should(db).have.property('name', 'elements');
      db.name.should.be.a.String;
    });

    it.skip('must have an addChangeListener function', function() {
      should(db.addChangeListener).be.a.Function;
    });

    it.skip('must have an removeChangeListener function', function() {
      should(db.removeChangeListener).be.a.Function;
    });

    it('must have a compact function', function() {
      should(db.compact).be.a.Function;
      db.compact().should.be.ok;
    });
    
    it('must have a deleteDatabase function', function() {
      var doomed = manager.getDatabase('doomed');
      should(doomed.deleteDatabase).be.a.Function;
      doomed.deleteDatabase().should.be.ok;
      
      var gone = manager.getExistingDatabase('doomed');
      should.not.exist(gone);
    });
    
    it.skip('must have an runAsync function', function() {
      should(db.runAsync).be.a.Function;
    });

    it.skip('must have an runInTransaction function', function() {
      should(db.runInTransaction).be.a.Function;
    });
  });


  describe('database (documents)', function() {
    
    it('must have a createDocument function', function() {
      should(db.createDocument).be.a.Function;
      var doc = db.createDocument();
      should.not.exist(db.error);
      should.exist(doc);
    });

    it('must have a getDocument function', function() {
      should(db.getDocument).be.a.Function;

      var existing = db.getDocument('59215DBF-69E2-4F0F-9D38-9A430F5A731C');
      should.exist(existing);
      should(existing).be.an.Object;
      should.not.exist(db.error);
      
      var newdoc = db.getDocument('getdocument-test-new-doc-id');
      should.exist(newdoc);
      should(newdoc).be.an.Object;
      newdoc.documentID.should.eql('getdocument-test-new-doc-id');
    });
    
    it('must have a getExistingDocument function', function() {
      should(db.getExistingDocument).be.a.Function;
      
      var existing = db.getExistingDocument('59215DBF-69E2-4F0F-9D38-9A430F5A731C');
      should.exist(existing);
      should(existing).be.an.Object;
      should.not.exist(db.error);
      
      var nonexisting = db.getExistigDocument('this-is-a-doc-id-that-does-not-exist');
      should.not.exist(nonexisting);
    });

    it.skip('must have a getValidation function', function() {
      should(db.getValidation).be.a.Function;
    });
  
    it.skip('must have a setValidation function', function() {
      should(db.setValidation).be.a.Function;
    });
  
    // LOCAL DOCUMENTS
    
    it('must have a deleteLocalDocument function', function() {
      should(db.deleteLocalDocument).be.a.Function;
    });

    it('must have a getExistingLocalDocument function', function() {
      should(db.getExistingLocalDocument).be.a.Function;
    });
    
    it('must have a putLocalDocument function', function() {
      should(db.putLocalDocument).be.a.Function;
    });
  });
  

  describe('database (views)', function() {
    
    it('must have a createAllDocumentsQuery function', function() {
      should(db.createAllDocumentsQuery).be.a.Function;
      var q = db.createAllDocumentsQuery();
      should.not.exist(db.error);
      should.exist(q);
    });
    
    it('must have a getExistingView function', function() {
      should(db.getExistingView).be.a.Function;
    });
  
    it('must have a getView function', function() {
      should(db.getView).be.a.Function;
    });
    
  });
  

  describe('database (replications)', function() {

    it.skip('must have a filterCompiler property', function() {
      should(db).have.property('filterCompiler');
    });
    
    it.skip('must have a getFilter function', function() {
      should(db.getFilter).be.a.Function;
    });
  
    it.skip('must have a setFilter function', function() {
      should(db.setFilter).be.a.Function;
    });
  
    it('must have an allReplications property', function() {
      should(db).have.property('allReplications');
      db.allReplications.should.be.an.Array;
      db.allReplications.should.have.a.lengthOf(0);
    });
    
    it('must have a createPullReplication function', function() {
      should(db.createPullReplication).be.a.Function;
      var rep = db.createPullReplication("http://touchbooks.iriscouch.com/test003_pull");
      should.not.exist(db.error);
      should.exist(rep);
    });
    
    it('must have a createPushReplication function', function() {
      should(db.createPushReplication).be.a.Function;
      var rep = db.createPushReplication("http://touchbooks.iriscouch.com/test003_push");
      should.not.exist(db.error);
      should.exist(rep);
    });
    
    
  });  
  
};

/*
Ti.include('test_utils.js')

var _ = require('underscore'),
    touchdb = require('com.obscure.titouchdb');

exports.run_tests = function() {
  var mgr = touchdb.databaseManager;
  var a = mgr.databaseNamed('test003a');
  try {
    
    assert(a.name === 'test003a', 'incorrect database name: '+ a.name);
    assert(a.documentCount === 0, 'incorrect document count: '+a.documentCount);
    
    var doc1 = a.documentWithID('nonexistant');
    assert(doc1 !== null, 'documentWithID() returned null for nonexistant ID; should create');
    assert(doc1.documentID === 'nonexistant', 'documentWithID() did not set the new document ID correctly '+doc1.documentID);
    
    var doc2 = a.documentWithID();
    assert(doc2 !== null, 'documentWithID(null) should return untitled document');
    assert(doc2.documentID !== null, "documentWithID(null) should have a doc ID");

    // docs aren't saved until a call to putProperties
    assert(a.documentCount === 0, "should have zero docs at this point: "+a.documentCount);
    
    var rev1 = doc1.putProperties({
      testName: 'testCreateDocument',
      tag: 1337
    });
    assert(rev1 !== null, 'putProperties should have returned a revision for doc1');
    assert(doc1.currentRevisionID !== null, 'calling putProperties should have created a revision');
    assert(a.documentCount === 1, "should have one doc at this point: "+a.documentCount);
    
    var rev2 = doc2.putProperties({
      testName: 'testCreateDocument',
      tag: 4567
    });
    assert(rev2 !== null, 'putProperties should have returned a revision for doc2');
    assert(doc2.currentRevisionID !== null, 'calling putProperties should have created a revision');
    assert(a.documentCount === 2, "should have two docs at this point: "+a.documentCount);
    
    // reselect doc
    var doc3 = a.documentWithID('nonexistant');
    assert(doc3 !== null, 'documentWithID() returned null for existing ID');
    assert(doc1 === doc3, 'original and reselected doc should be the same object');
    
    // all documents query
    var query = a.createAllDocumentsQuery();
    assert(query !== null, "all docs query should not be null");
    
    var rows = query.run();
    assert(rows !== null, "all docs query rows returned null");
    assert(rows.count === 2, "incorrect number of rows returned by all docs query: "+rows.count);

    // compact
    var compacted = a.compact();
    assert(a, "compact failed");
    
    a.deleteDatabase();
  }
  catch (e) {
    a.deleteDatabase();
    throw e;
  }
    
}

*/