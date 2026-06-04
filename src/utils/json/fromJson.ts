export const fromJson = <T>(json: string): T => {
  return JSON.parse(json) as T;
};
