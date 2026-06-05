import { describe, expect, test } from 'vitest';

import { runShortcutShell } from './runShortcutShell';

describe('runShortcutShell Function', () => {
  test('should exist', () => {
    expect(runShortcutShell).toBeDefined();
  });

  test('should have an error message when second argument does not exist', async () => {
    // @ts-expect-error testing missing input
    const func = runShortcutShell('TestRunShortcutShellHelper');
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when second argument is string', async () => {
    // @ts-expect-error testing invalid input
    const func = runShortcutShell('TestRunShortcutShellHelper', 'hello');
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when second argument is an empty object', async () => {
    const func = runShortcutShell('TestRunShortcutShellHelper', {});
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have an error message when second argument is an array', async () => {
    const func = runShortcutShell('TestRunShortcutShellHelper', []);
    const errorMessage = 'runShortcutShell: input must be a non-empty object';

    await expect(func).rejects.toThrow(errorMessage);
  });

  test('should have a success message when second argument is a non-empty object', async () => {
    const result = await runShortcutShell('TestRunShortcutShellHelper', {
      fakeKey: 'fakeValue',
    });

    const expected = {
      success: true,
      message: 'Input Type is JSON',
      file: 'TestRunShortcutShellHelper',
    };

    expect(result).toStrictEqual(expected);
  });
});
