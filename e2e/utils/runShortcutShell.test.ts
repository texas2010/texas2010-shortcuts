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
    const errorMessage =
      'TestRunShortcutShellHelper: Shortcut Input does not have any value';
    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when second argument is string', async ({
    expect,
  }) => {
    const func = runShortcutShell('TestRunShortcutShellHelper', 'hello');
    const errorMessage = 'Input Type is Text. Invalid';
    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when second argument is object and object is empty', async ({
    expect,
  }) => {
    const func = runShortcutShell('TestRunShortcutShellHelper', {});
    const errorMessage = 'Dict is empty';
    await expect(func).rejects.toThrow(errorMessage);
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
