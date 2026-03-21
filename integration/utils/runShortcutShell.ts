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
  constructor(public message: string, public sourceShortcut: string) {
    super(message);
  }
}

export const runShortcutShell = async <T>(
  shortcutName: string,
  input: any | string = ''
): Promise<RunShortcutResSuccess<T>> => {
  const isInputEmpty = !input;
  const isInputObj = typeof input === 'object';

  const json = JSON.stringify(input).replace(/"/g, '\\"');

  const appleScriptTemplate = `
  ${isInputObj ? `set json to "${json}"` : ''}
  tell application "Shortcuts Events"
    run shortcut "${shortcutName}" ${
    !isInputEmpty
      ? isInputObj
        ? `with input json`
        : `with input "${input}"`
      : ''
  }
  end tell
`;

  try {
    const result = await runAppleScript(appleScriptTemplate);

    if (isValidJson(result)) {
      const parsed = JSON.parse(result) as
        | RunShortcutResError
        | RunShortcutResSuccess<T>;

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
      `runShortcutShell: Response is invalid and not JSON.${hasResultError}`
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
