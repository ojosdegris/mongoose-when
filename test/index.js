var assert = require('assert');
var mongoose = require('mongoose');
var when = require('../');
var Promise = mongoose.Promise;

describe('mongoose-when', function(){
  it('is a function', function(done){
    assert.equal('function', typeof Promise.when);
    done();
  });

  it('has a version', function(done){
    assert.equal('string', typeof Promise.when.version);
    assert.equal('string', typeof when.version);
    done();
  });
});

describe('Promise.when', function(){
  var result_a = 'abc123';
  var result_b = 'xyz456';
  it('returns from a single promise', function(done){
    var p = new Promise();
    var whenPromise = Promise.when(p).addBack(function(err, result){
      assert.ifError(err);
      assert.equal(result_a, result);
      done();
    });
    assert.equal(p, whenPromise);
    p.fulfill(result_a);
  });

  it('returns from a two promises', function(done){
    var p = new Promise();
    var p2 = new Promise();

    var whenPromise = Promise.when(p, p2).addBack(function(err, result, result2){
      assert.ifError(err);
      assert.equal(result_a, result);
      assert.equal(result_b, result2);
      done();
    });
    assert.notEqual(p, whenPromise);
    assert.notEqual(p2, whenPromise);

    p.fulfill(result_a);
    p2.fulfill(result_b);

  });

  it('rejects when one of the promises rejects', function(done){
    var p = new Promise();
    var p2 = new Promise();

    Promise.when(p, p2).addBack(function(err, result, result2){
      assert.equal(result_b, err);
      assert.equal(null, result);
      assert.equal(null, result2);
      done();
    });

    p.fulfill(result_a);
    p2.reject(result_b);
  });

  it('puts multiple argument resolves into an array', function(done){
    var p = new Promise();
    var p2 = new Promise();

    Promise.when(p, p2).addBack(function(err, result, result2){
      assert.ifError(err);
      assert.equal(result_a, result);
      assert.ok(Array.isArray(result2));
      assert.equal(result_a, result2[0]);
      assert.equal(result_b, result2[1]);
      done();
    });

    p.fulfill(result_a);
    p2.fulfill(result_a, result_b);
  });
});


/*
    model.textSearch('blueberry', function (err, res) {
      assert.ifError(err);
      assert.ok(res);
      assert.ok(Array.isArray(res.results));
      res.results.forEach(function (result) {
        assert.ok(result.obj instanceof mongoose.Document);
      })
      assert.equal(1, res.results.length);
      assert.equal(blueberry.id, res.results[0].obj.id);
      done();
    })
  })

  it('accepts limit', function(done){
    model.textSearch('strings', { limit: 1 }, function (err, res) {
      assert.ifError(err);
      assert.ok(res);
      assert.ok(Array.isArray(res.results));
      assert.equal(1, res.results.length);
      assert.equal(blueberry.id, res.results[0].obj.id);
      done();
    })
  })

  it('accepts filter (and casts)', function(done){
    model.textSearch('strings', { filter: { array: [1] } }, function (err, res) {
      assert.ifError(err);
      assert.ok(res);
      assert.ok(Array.isArray(res.results));
      assert.equal(1, res.results.length);
      assert.equal(elephant.id, res.results[0].obj.id);
      done();
    })
  })

  describe('accepts project', function(){
    it('with object syntax', function(done){
      model.textSearch('funny', { project: {single: 0}}, function (err, res) {
        assert.ifError(err);
        assert.ok(res);
        assert.ok(Array.isArray(res.results));
        assert.equal(1, res.results.length);
        assert.equal(letters.id, res.results[0].obj.id);
        assert.equal(undefined, res.results[0].obj.single);
        done();
      })
    })
    it('with string syntax', function(done){
      model.textSearch('funny', { project: '-single'}, function (err, res) {
        assert.ifError(err);
        assert.ok(res);
        assert.ok(Array.isArray(res.results));
        assert.equal(1, res.results.length);
        assert.equal(letters.id, res.results[0].obj.id);
        assert.equal(undefined, res.results[0].obj.single);
        done();
      })
    })
  })

  it('accepts language', function(done){
    model.textSearch('funny', { language: 'spanish'}, function (err, res) {
      assert.ifError(err);
      assert.ok(res);
      assert.ok(Array.isArray(res.results));
      assert.equal(0, res.results.length);
      done();
    })
  })

  it('supports lean', function(done){
    model.textSearch('string', { lean: true }, function (err, res) {
      assert.ifError(err);
      assert.ok(res);
      assert.ok(Array.isArray(res.results));
      assert.equal(2, res.results.length);
      res.results.forEach(function (result) {
        assert.ok(!(result.obj instanceof mongoose.Document));
      })
      done();
    })
  })

})

// if mongoose >= 3.6.1 text index type is supported
*/
