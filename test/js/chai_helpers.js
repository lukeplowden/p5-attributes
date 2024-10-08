import p5 from '../../src/app.js';
import { ValidationError } from 'zod-validation-error';

// Setup chai
var expect = chai.expect;
var assert = chai.assert;

assert.arrayApproximately = function (arr1, arr2, delta, desc) {
  assert.equal(arr1.length, arr2.length);
  for (var i = 0; i < arr1.length; i++) {
    assert.approximately(arr1[i], arr2[i], delta, desc);
  }
}

assert.deepCloseTo = function(actual, expected, digits = 4) {
  expect(actual.length).toBe(expected.length);
  for (let i = 0; i < actual.length; i++) {
    expect(actual[i]).withContext(`[${i}]`).toBeCloseTo(expected[i], digits);
  }
}

// a custom assertion for validation errors that correctly handles
// minified p5 libraries.
assert.validationError = function (fn) {
  if (p5.ValidationError) {
    assert.throws(fn, p5.ValidationError);
  } else {
    assert.doesNotThrow(fn, Error, 'got unwanted exception');
  }
};

// A custom assertion for validation results for the new parameter validation
// system.
assert.validationResult = function (result, expectSuccess) {
  if (expectSuccess) {
    assert.isTrue(result.success);
  } else {
    assert.instanceOf(result.error, ValidationError);
  }
};
