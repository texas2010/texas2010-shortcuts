import { describe, expect, test } from 'vitest';

import { normalizeShortcutInput } from './normalizeShortcutInput';

describe('normalizeShortcutInput function', () => {
  test('should exist', () => {
    expect(normalizeShortcutInput).toBeDefined();
  });

  test('should return an error when input is missing', () => {
    const result = normalizeShortcutInput();

    const expected = {
      success: false,
      message: 'Input must exist',
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return an error when input is an array', () => {
    const result = normalizeShortcutInput([]);

    const expected = {
      success: false,
      message: 'Input must be an object or JSON string',
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return an error when input is not an object or string', () => {
    const result = normalizeShortcutInput(123);

    const expected = {
      success: false,
      message: 'Input must be an object or JSON string',
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return an error when input string is not JSON', () => {
    const result = normalizeShortcutInput('just string');

    const expected = {
      success: false,
      message: 'Input must be JSON',
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return an error when JSON string is not an object', () => {
    const result = normalizeShortcutInput(JSON.stringify(['fakeValue']));

    const expected = {
      success: false,
      message: 'Input must be a JSON object',
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return a normalized object when input is an object', () => {
    const input = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {
        fakeKey: 'fakeValue',
      },
    };

    const result = normalizeShortcutInput(input);

    const expected = {
      success: true,
      shortcutParameter: input,
    };

    expect(result).toStrictEqual(expected);
  });

  test('should return a normalized object when input is a JSON string', () => {
    const input = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {
        fakeKey: 'fakeValue',
      },
    };

    const result = normalizeShortcutInput(JSON.stringify(input));

    const expected = {
      success: true,
      shortcutParameter: input,
    };

    expect(result).toStrictEqual(expected);
  });
});
