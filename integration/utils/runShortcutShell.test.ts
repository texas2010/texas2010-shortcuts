import { describe, expect, test } from 'vitest';

import { runShortcutShell } from './runShortcutShell';

describe('runShortcutShell Function', () => {
  test('should be exist', () => {
    expect(runShortcutShell).toBeDefined();
  });

  test('should have an error message when second argument is not exist', async ({
    expect,
  }) => {
    const func = runShortcutShell('TestRunShortcutShellHelper');
    const message =
      'TestRunShortcutShellHelper: Shortcut Input does not have any value';
    await expect(func).rejects.toThrow(message);
  });

  test('should have an error message when second argument is string', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper', 'hello');
    const resultObj = {
      error: true,
      message: 'Input Type is Text. Invalid',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(resultObj);
  });

  test('should have an error message when second argument is object and object is empty', async () => {
    const func = await runShortcutShell('TestRunShortcutShellHelper', {});
    const resultObj = {
      error: true,
      message: 'Dict is empty',
      file: 'TestRunShortcutShellHelper',
    };

    expect(func).toStrictEqual(resultObj);
  });

  test('should have a success message when second argument is object', async () => {
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
