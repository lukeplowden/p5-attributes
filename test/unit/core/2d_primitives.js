import p5 from '../../../src/app.js';

suite('2D Primitives', function() {
  var myp5;

  beforeAll(function() {
    new p5(function(p) {
      p.setup = function() {
        myp5 = p;
      };
    });
  });

  afterAll(async function() {
    await myp5.remove();
  });

  suite('p5.prototype.arc', function() {
    test('should be a function', function() {
      assert.ok(myp5.arc);
      assert.typeOf(myp5.arc, 'function');
    });
  });

  suite('p5.prototype.ellipse', function() {
    test('should be a function', function() {
      assert.ok(myp5.ellipse);
      assert.typeOf(myp5.ellipse, 'function');
    });
  });

  suite('p5.prototype.line', function() {
    test('should be a function', function() {
      assert.ok(myp5.line);
      assert.typeOf(myp5.line, 'function');
    });
  });

  suite('p5.prototype.point', function() {
    test('should be a function', function() {
      assert.ok(myp5.point);
      assert.typeOf(myp5.point, 'function');
    });
  });

  suite('p5.prototype.quad', function() {
    test('should be a function', function() {
      assert.ok(myp5.quad);
      assert.typeOf(myp5.quad, 'function');
    });
  });

  suite('p5.prototype.rect', function() {
    test('should be a function', function() {
      assert.ok(myp5.rect);
      assert.typeOf(myp5.rect, 'function');
    });
  });

  suite('p5.prototype.triangle', function() {
    test('should be a function', function() {
      assert.ok(myp5.triangle);
      assert.typeOf(myp5.triangle, 'function');
    });
  });
  suite('p5.prototype.square', function() {
    test('should be a function', function() {
      assert.ok(myp5.square);
      assert.typeOf(myp5.square, 'function');
    });
  });

  suite('p5.prototype._normalizeArcAngles', function() {
    test('start/stop both at zero', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i,
            2 * Math.PI * j,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 0, 0.000005);
          assert.approximately(angles.stop, 0, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop same but non-zero', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 1,
            2 * Math.PI * j + 1,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 1, 0.000005);
          assert.approximately(angles.stop, 1, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop both close to zero, start < stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i - 0.000001,
            2 * Math.PI * j + 0.000001,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 2 * Math.PI - 0.000001, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI + 0.000001, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop both close to zero, start > stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 0.000001,
            2 * Math.PI * j - 0.000001,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 0.000001, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI - 0.000001, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop both close to same non-zero, start < stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 0.999999,
            2 * Math.PI * j + 1.000001,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 0.999999, 0.000005);
          assert.approximately(angles.stop, 1.000001, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop both close to same non-zero, start > stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 1.000001,
            2 * Math.PI * j + 0.999999,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 1.000001, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI + 0.999999, 0.000005);
          assert.isTrue(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop around zero but not close, start < stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i - 0.1,
            2 * Math.PI * j + 0.1,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 2 * Math.PI - 0.1, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI + 0.1, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop around zero but not close, start > stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 0.1,
            2 * Math.PI * j - 0.1,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 0.1, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI - 0.1, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop away from zero and not close, start < stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 0.9,
            2 * Math.PI * j + 1.1,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 0.9, 0.000005);
          assert.approximately(angles.stop, 1.1, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
    test('start/stop away from zero and not close, start > stop', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * i + 1.1,
            2 * Math.PI * j + 0.9,
            500,
            5,
            false
          );
          assert.approximately(angles.start, 1.1, 0.000005);
          assert.approximately(angles.stop, 2 * Math.PI + 0.9, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
    test('scaling correction, quadrants 1 and 3', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * (i + 40 / 360),
            2 * Math.PI * (j + 230 / 360),
            500,
            5,
            true
          );
          assert.approximately(angles.start, 1.558879, 0.000005);
          assert.approximately(angles.stop, 4.703998, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
    test('scaling correction, quadrants 2 and 4', function() {
      var i, j, angles;
      for (i = -2; i <= 2; i++) {
        for (j = -2; j <= 2; j++) {
          angles = myp5._normalizeArcAngles(
            2 * Math.PI * (i + 320 / 360),
            2 * Math.PI * (j + 130 / 360),
            500,
            5,
            true
          );
          assert.approximately(angles.start, 4.724306, 0.000005);
          assert.approximately(angles.stop, 7.862372, 0.000005);
          assert.isFalse(angles.correspondToSamePoint);
        }
      }
    });
  });
});
