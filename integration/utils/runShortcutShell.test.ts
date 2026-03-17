import { describe, expect, test } from 'vitest';

import { runShortcutShell } from './runShortcutShell';

describe('runShortcutShell', () => {
  test('should be exist', () => {
    expect(runShortcutShell).toBeDefined();
  });

  // test('should have an error message when JSON Parse converted is failed', async ({
  //   expect,
  // }) => {
  //   const func = runShortcutShell('TestRunShortcutShellHelper');
  //   const errorMessage = 'runShortcutShell: JSON Parse converted is failed';
  //   await expect(func).rejects.toThrow(errorMessage);
  // });

  test('should have an error message when function return object', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper');
    const errorObj = {
      error: true,
      message: 'Shortcut Input does not have any value',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(errorObj);
  });

  test('should have an error message when second parameter is not exist', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper');
    const errorObj = {
      error: true,
      message: 'Shortcut Input does not have any value',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(errorObj);
  });

  test('should have an error message when second parameter is string', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper', 'hello');
    const resultObj = {
      error: true,
      message: 'Input Type is Text. Invalid',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(resultObj);
  });

  test('should have an error message when second parameter is object and object is empty', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper', {});
    const resultObj = {
      error: true,
      message: 'Dict is empty',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(resultObj);
  });

  test('should have an success message when second parameter is object', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper', {
      fakeKey: 'fakeValue',
    });
    const resultObj = {
      success: true,
      message: 'Input Type is Dict',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(resultObj);
  });
});
