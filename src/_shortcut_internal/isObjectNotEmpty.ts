const isObjectNotEmpty = (obj: object) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
};

module.exports = isObjectNotEmpty;
