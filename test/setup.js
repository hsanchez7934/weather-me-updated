if (typeof process === 'object') {
  // Initialize node environment
  global.expect = require('chai').expect;
} else {
  window.expect = window.chai.expect;
  window.require = function () { /* noop */ };
}
