import { describe, expect, test, beforeAll } from 'vitest';

import { mainScriptFunction } from './files';

describe('mainScript Function', () => {
  test('should be exist', () => {
    expect(mainScriptFunction).toBeDefined();
  });

  test('should have an error message when arguement is empty', () => {
    const result = mainScriptFunction();
    const expected = {
      error: true,
      message: 'Input must be exist',
    };
    expect(result).toStrictEqual(expected);
  });

  test('should have an arror message when argument is string', () => {
    const result = mainScriptFunction('just string');
    const expected = {
      error: true,
      message: 'Input must be Dictionary',
    };
    expect(result).toStrictEqual(expected);
  });

  test('should have an error message when argument is empty object', () => {
    const result = mainScriptFunction({});
    const expected = {
      error: true,
      message: `Input object can't be empty`,
    };
    expect(result).toStrictEqual(expected);
  });
});
