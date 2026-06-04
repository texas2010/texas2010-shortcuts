import { describe, expect, test } from 'vitest';

import {
  runScriptableShortcut,
  RunScriptableParams,
} from './runScriptableShortcut';

describe('RunScriptableShortcut function', () => {
  test('should exist', () => {
    expect(runScriptableShortcut).toBeDefined();
  });

  test('should have an error message when params are missing', async () => {
    // @ts-expect-error testing missing input
    const func = runScriptableShortcut();
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when params are a string', async () => {
    // @ts-expect-error testing invalid input
    const func = runScriptableShortcut('it is just string');
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when params are an empty object', async () => {
    // @ts-expect-error testing invalid input
    const func = runScriptableShortcut({});
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have a success message', async () => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {
        successMessage: 'This is a success message',
      },
    } as RunScriptableParams;

    const expected = {
      success: true,
      message: 'This is a success message',
    };

    const result = await runScriptableShortcut(params);
    expect(result).toMatchObject(expected);
  });
});
