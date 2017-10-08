Object.defineProperty(Error.prototype, 'message', {
  configurable: true,
  enumerable: true,
});

if (!('toJSON' in Error.prototype)) {
  Object.defineProperty(Error.prototype, 'toJSON', {
    configurable: true,
    value() {
      const alt = {};
      // Object.getOwnPropertyNames(this)
      ['message', 'name', 'errors'].forEach(function(key) {
        alt[key] = this[key];
      }, this);
      return alt;
    },
    writable: true,
  });
}
