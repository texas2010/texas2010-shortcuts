import { describe, expect, test } from 'vitest';

import { mainScript } from './mainScript';

describe('mainScript function', () => {
  test('should exist', () => {
    expect(mainScript).toBeDefined();
  });

  test('should return a JSON error when input is invalid', () => {
    const result = mainScript();

    const expected = {
      error: true,
      message: 'Input must exist',
    };

    expect(JSON.parse(result)).toStrictEqual(expected);
  });

  test('should return a JSON success when input is valid', () => {
    const result = mainScript({
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {
        fakeKey: 'fakeValue',
      },
    });

    const expected = {
      success: true,
      message: 'This is a success message',
    };

    expect(JSON.parse(result)).toStrictEqual(expected);
  });
});
