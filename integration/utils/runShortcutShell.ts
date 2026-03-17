import { runAppleScript } from 'run-applescript';

interface ShortcutInput {}

interface RunShortcutResSuccess {
  success: true;
  sourceShortcut: string;
}

// interface RunShortcutResSuccessWithData<T> extends RunShortcutResSuccess {
//   data: T;
// }

interface RunShortcutResError {
  error: true;
  sourceShortcut: string;
  message: string;
}

// type RunShortcutPromiseReturn = Promise<
//   RunShortcutResSuccess | RunShortcutResSuccessWithData<T> | RunShortcutResError
// >;

export const runShortcutShell = async <T>(
  shortcutName: string,
  input: object | string = ''
) => {
  const isInputEmpty = !input;
  const isInputObj = typeof input === 'object';

  const json = JSON.stringify(input).replace(/"/g, '\\"');

  console.log('runShortcutShell JSON:', json);

  try {
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

    console.log('appleScriptTemplate', appleScriptTemplate);
    const result = await runAppleScript(appleScriptTemplate);
    // const result = await runAppleScript(`
    //   set json to "${json}"
    //   tell application "Shortcuts Events"
    //     run shortcut "${shortcutName}" with input json
    //   end tell
    // `);

    console.log('runShortcutShell Result: ', result, 'Type:', typeof result);

    try {
      const maybeJson = JSON.parse(result);
      console.log('runShortcutShell: maybeJson', maybeJson);

      return maybeJson;
    } catch {
      throw new Error('runShortcutShell: JSON Parse converted is failed');
    }
  } catch (error) {
    console.log('runShortcutShell Error:', error);
    if (error && 'message' in error) {
      console.log('error with message', error.message);
      if (error.message.includes('JSON Parse')) {
        throw new Error(error.message);
      }
    }
    throw new Error('runShortcutShell: Shortcut data response is not valid');
  }
};
