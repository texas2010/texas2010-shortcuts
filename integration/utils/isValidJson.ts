export const isValidJson = (input) => {
  if (typeof input !== 'string') return false;

  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};
