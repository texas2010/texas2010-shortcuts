export const isValidJson = (input: string) => {
  if (typeof input !== 'string') return false;

  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
};
