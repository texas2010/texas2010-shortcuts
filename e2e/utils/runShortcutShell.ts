import { runAppleScript } from 'run-applescript';

import { isValidJson } from './isValidJson';

interface RunShortcutResSuccess<T> {
  success: true;
  sourceShortcut: string;
  data: T;
}

interface RunShortcutResError {
  error: true;
  sourceShortcut: string;
  message: string;
}

class RunShortcutError extends Error {
  constructor(
    public message: string,
    public sourceShortcut: string,
  ) {
    super(message);
  }
}

const isPlainObject = (value: unknown): value is ShortcutInput => {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).length > 0
  );
};
type ShortcutInput = object;

export const runShortcutShell = async <
  TOutput,
  TInput extends ShortcutInput = ShortcutInput,
>(
  shortcutName: string,
  input: TInput,
): Promise<RunShortcutResSuccess<TOutput>> => {
  if (!isPlainObject(input)) {
    throw new Error('runShortcutShell: input must be a non-empty object');
  }

  const json = JSON.stringify(input).replace(/"/g, '\\"');
  const appleScriptTemplate = `
  set json to "${json}"
  tell application "Shortcuts Events"
    run shortcut "${shortcutName}" with input json
  end tell
`;

  try {
    const result = await runAppleScript(appleScriptTemplate);

    if (isValidJson(result)) {
      const parsed = JSON.parse(result) as
        | RunShortcutResError
        | RunShortcutResSuccess<TOutput>;

      if (parsed && 'error' in parsed && parsed.error === true) {
        throw new RunShortcutError(parsed.message, parsed.sourceShortcut);
      }

      if (parsed && 'success' in parsed && parsed.success === true) {
        return parsed;
      }

      throw new Error('runShortcutShell: Invalid Response');
    }
    const hasResultError = !!result ? ` ${result}` : '';
    throw new Error(
      `runShortcutShell: Response is invalid and not JSON.${hasResultError}`,
    );
  } catch (error) {
    if (error instanceof RunShortcutError) {
      throw error;
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('runShortcutShell: Something wrong with it');
  }
};
