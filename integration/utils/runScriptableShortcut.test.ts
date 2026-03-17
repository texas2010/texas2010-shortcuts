import { describe, expect, test } from 'vitest';

import { runScriptableShortcut } from './runScriptableShortcut';

describe('RunScriptableShortcut function', () => {
  test('should be exist', () => {
    expect(runScriptableShortcut).toBeDefined();
  });

  test('should have an error message when argument is empty', async ({
    expect,
  }) => {
    // @ts-ignore
    const func = runScriptableShortcut();
    const message = 'RunScriptable: Input must be Dictionary';
    await expect(func).rejects.toThrow(message);
  });

  test('should have an error message when argument is string', async ({
    expect,
  }) => {
    // @ts-ignore
    const func = runScriptableShortcut('it is just string');
    const message = 'RunScriptable: Input must be Dictionary or JSON';
    await expect(func).rejects.toThrow(message);
  });

  test('should have an error message when actionType is empty', async () => {
    const params = {
      actionType: '',
      sourceShortcut: 'sourceShortcut',
      inputData: {},
    } as Parameters<typeof runScriptableShortcut>[0];

    const func = await runScriptableShortcut(params);
    expect(func).toStrictEqual({
      error: true,
      message: "actionType can't be empty",
    });
  });

  test('should have an error message when sourceShortcut is empty', async () => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: '',
      inputData: {},
    } as Parameters<typeof runScriptableShortcut>[0];

    const func = await runScriptableShortcut(params);
    expect(func).toStrictEqual({
      error: true,
      message: "sourceShortcut can't be empty",
    });
  });
  test('should have an error message when actionType and sourceShortcut is empty', async () => {
    const params = {
      actionType: '',
      sourceShortcut: '',
    } as Parameters<typeof runScriptableShortcut>[0];

    const func = await runScriptableShortcut(params);
    expect(func).toStrictEqual({
      error: true,
      message: "actionType and sourceShortcut can't be empty",
    });
  });

  test('should have an error message when inputData is empty', async () => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {},
    } as Parameters<typeof runScriptableShortcut>[0];

    const func = await runScriptableShortcut(params);
    expect(func).toStrictEqual({
      error: true,
      message: "inputData can't be empty",
    });
  });
});
