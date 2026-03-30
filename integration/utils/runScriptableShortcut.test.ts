import { describe, expect, test } from 'vitest';

import {
  runScriptableShortcut,
  RunScriptableParams,
} from './runScriptableShortcut';

describe('RunScriptableShortcut function', () => {
  test('should be exist', () => {
    expect(runScriptableShortcut).toBeDefined();
  });

  test('should have an error message when argument is empty', async ({
    expect,
  }) => {
    // @ts-ignore
    const func = runScriptableShortcut();
    const message = 'Input must be exist';
    await expect(func).rejects.toThrow(message);
  });

  test('should have an error message when argument is string', async ({
    expect,
  }) => {
    // @ts-ignore
    const func = runScriptableShortcut('it is just string');
    const message = 'Input must be Dictionary or JSON';
    await expect(func).rejects.toThrow(message);
  });
  test('should have an error message when argument is empty object', async ({
    expect,
  }) => {
    // @ts-ignore
    const func = runScriptableShortcut({});
    const message = `Input can't be empty`;
    await expect(func).rejects.toThrow(message);
  });

  test('should have an error message when actionType is empty', async ({
    expect,
  }) => {
    const params = {
      actionType: '',
      sourceShortcut: 'sourceShortcut',
      inputData: {},
    } as RunScriptableParams;
    const errorMessage = "actionType can't be empty";

    const func = runScriptableShortcut(params);
    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when sourceShortcut is empty', async ({
    expect,
  }) => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: '',
      inputData: {},
    } as RunScriptableParams;
    const errorMessage = "sourceShortcut can't be empty";

    const func = runScriptableShortcut(params);
    await expect(func).rejects.toThrow(errorMessage);
  });
  test('should have an error message when actionType and sourceShortcut is empty', async ({
    expect,
  }) => {
    const params = {
      actionType: '',
      sourceShortcut: '',
    } as RunScriptableParams;
    const errorMessage = "actionType and sourceShortcut can't be empty";

    const func = runScriptableShortcut(params);
    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when inputData is empty', async ({
    expect,
  }) => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {},
    } as RunScriptableParams;

    const errorMessage = "inputData can't be empty";

    const func = runScriptableShortcut(params);
    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have success message', async () => {
    const params = {
      actionType: 'actionType',
      sourceShortcut: 'sourceShortcut',
      inputData: {
        successMessage: 'This is a success Message',
      },
    } as RunScriptableParams;

    const expected = {
      success: true,
      ...params.inputData,
    };

    const result = await runScriptableShortcut(params);
    expect(result).toMatchObject(expected);
  });
});
