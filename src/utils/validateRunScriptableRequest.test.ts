import { describe, expect, test } from 'vitest';

import { validateRunScriptableRequest } from './validateRunScriptableRequest';

describe('validateRunScriptableRequest function', () => {
  test('should exist', () => {
    expect(validateRunScriptableRequest).toBeDefined();
  });

  test('should return an error when actionType is missing', () => {
    const result = validateRunScriptableRequest({
      sourceShortcut: 'Test Shortcut',
      inputData: {},
    });

    expect(result).toEqual({
      success: false,
      message: 'RunScriptable request actionType must be a non-empty string',
    });
  });

  test('should return an error when actionType is empty', () => {
    const result = validateRunScriptableRequest({
      actionType: '',
      sourceShortcut: 'Test Shortcut',
      inputData: {},
    });

    expect(result).toEqual({
      success: false,
      message: 'RunScriptable request actionType must be a non-empty string',
    });
  });

  test('should return an error when sourceShortcut is missing', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      inputData: {},
    });

    expect(result).toEqual({
      success: false,
      message:
        'RunScriptable request sourceShortcut must be a non-empty string',
    });
  });

  test('should return an error when sourceShortcut is empty', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: '',
      inputData: {},
    });

    expect(result).toEqual({
      success: false,
      message:
        'RunScriptable request sourceShortcut must be a non-empty string',
    });
  });

  test('should return an error when inputData is missing', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: 'Test Shortcut',
    });

    expect(result).toEqual({
      success: false,
      message: 'RunScriptable request inputData must be an object',
    });
  });

  test('should return an error when inputData is an array', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: 'Test Shortcut',
      inputData: [],
    });

    expect(result).toEqual({
      success: false,
      message: 'RunScriptable request inputData must be an object',
    });
  });

  test('should return an error when options is not an object', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: 'Test Shortcut',
      inputData: {},
      options: true,
    });

    expect(result).toEqual({
      success: false,
      message: 'RunScriptable request options must be an object when provided',
    });
  });

  test('should return success when request is valid without options', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: 'Test Shortcut',
      inputData: {
        text: 'hello',
      },
    });

    expect(result).toEqual({
      success: true,
      request: {
        actionType: 'testAction',
        sourceShortcut: 'Test Shortcut',
        inputData: {
          text: 'hello',
        },
      },
    });
  });

  test('should return success when request is valid with options', () => {
    const result = validateRunScriptableRequest({
      actionType: 'testAction',
      sourceShortcut: 'Test Shortcut',
      inputData: {
        text: 'hello',
      },
      options: {
        notify: true,
      },
    });

    expect(result).toEqual({
      success: true,
      request: {
        actionType: 'testAction',
        sourceShortcut: 'Test Shortcut',
        inputData: {
          text: 'hello',
        },
        options: {
          notify: true,
        },
      },
    });
  });
});
