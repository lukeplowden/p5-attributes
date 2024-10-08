import p5 from '../../../src/app.js';

suite('Curves', function() {
  var myp5;

  beforeAll(function() {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
      };
    });
  });

  afterAll(function() {
    myp5.remove();
  });

  suite('p5.prototype.bezier', function() {
    test('should be a function', function() {
      assert.ok(myp5.bezier);
      assert.typeOf(myp5.bezier, 'function');
    });
  });

  suite('p5.prototype.bezierPoint', function() {
    var result;
    test('should be a function', function() {
      assert.ok(myp5.bezierPoint);
      assert.typeOf(myp5.bezierPoint, 'function');
    });
    test('should return the correct point on a Bezier Curve', function() {
      result = myp5.bezierPoint(85, 10, 90, 15, 0.5);
      assert.equal(result, 50);
      assert.notEqual(result, -1);
    });
  });

  suite('p5.prototype.bezierTangent', function() {
    var result;
    test('should be a function', function() {
      assert.ok(myp5.bezierTangent);
      assert.typeOf(myp5.bezierTangent, 'function');
    });
    test('should return the correct point on a Bezier Curve', function() {
      result = myp5.bezierTangent(95, 73, 73, 15, 0.5);
      assert.equal(result, -60);
    });
  });

  suite('p5.prototype.curve', function() {
    test('should be a function', function() {
      assert.ok(myp5.curve);
      assert.typeOf(myp5.curve, 'function');
    });
  });

  suite('p5.prototype.curvePoint', function() {
    var result;
    test('should be a function', function() {
      assert.ok(myp5.curvePoint);
      assert.typeOf(myp5.curvePoint, 'function');
    });
    test('should return the correct point on a Catmull-Rom Curve', function() {
      result = myp5.curvePoint(5, 5, 73, 73, 0.5);
      assert.equal(result, 39);
      assert.notEqual(result, -1);
    });
  });

  suite('p5.prototype.curveTangent', function() {
    var result;
    test('should be a function', function() {
      assert.ok(myp5.curveTangent);
      assert.typeOf(myp5.curveTangent, 'function');
    });
    test('should return the correct point on a Catmull-Rom Curve', function() {
      result = myp5.curveTangent(95, 73, 73, 15, 0.5);
      assert.equal(result, 10);
      assert.notEqual(result, -1);
    });
  });
});
