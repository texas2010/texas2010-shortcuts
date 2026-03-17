import { describe, expect, test } from 'vitest';

import { runScriptableShortcut } from './runScriptableShortcut';

describe('RunScriptableShortcut function', () => {
  test('should be exist', () => {
    expect(runScriptableShortcut).toBeDefined();
  });

  test('should have an error message when argument is empty', async () => {
    // @ts-ignore
    const func = await runScriptableShortcut();
  });

  test('should have an error message when actionType is empty', async () => {
    const params = {
      actionType: '',
      sourceShortcut: '',
      inputData: {},
    } as Parameters<typeof runScriptableShortcut>[0];

    const func = await runScriptableShortcut(params);
    expect(func).toStrictEqual({
      error: true,
      message: "actionType can't be empty",
    });
  });
});
