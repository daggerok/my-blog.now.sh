const arrayOf = (maybeArray = []) =>
  Array.isArray(maybeArray) ? [...maybeArray] : [maybeArray];

module.exports = {
  arrayOf,
};
