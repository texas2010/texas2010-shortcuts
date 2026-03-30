// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: robot;

interface shortcutParameter {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
  readonly _is_shortcut_json?: boolean;
}

interface ErrorResult {
  error: boolean;
  message: string;
  _is_shortcut_json?: boolean;
}

const consoleLog = async (subtitle: string = '', body: string) => {
  const n = new Notification();
  n.title = 'Console Log';
  n.subtitle = subtitle;
  n.body = body;
  await n.schedule();
};

const isObjectNotEmpty = (obj: object) => {
  return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
};

const rawShortcutParameter = args.shortcutParameter;

if ('_is_shortcut_json' in rawShortcutParameter) {
  delete rawShortcutParameter['_is_shortcut_json'];
}

if (!rawShortcutParameter || !isObjectNotEmpty(rawShortcutParameter)) {
  if (config.runsWithSiri) {
    const errorResult = {
      error: true,
      message: `Input can't be empty`,
    } as ErrorResult;

    if (args.shortcutParameter._is_shortcut_json) {
      errorResult['_is_shortcut_json'] =
        args.shortcutParameter._is_shortcut_json;
    }

    Script.setShortcutOutput(errorResult);
    Script.complete();
    // @ts-ignore
    return;
  }
}

const { actionType, sourceShortcut, inputData, _is_shortcut_json } =
  args.shortcutParameter as shortcutParameter;

if (!actionType || !sourceShortcut || !isObjectNotEmpty(inputData)) {
  let errorMessage;
  if (!actionType && !sourceShortcut) {
    errorMessage = "actionType and sourceShortcut can't be empty";
  } else if (!actionType) {
    errorMessage = "actionType can't be empty";
  } else if (!sourceShortcut) {
    errorMessage = "sourceShortcut can't be empty";
  } else if (!isObjectNotEmpty(inputData)) {
    errorMessage = "inputData can't be empty";
  }

  if (config.runsWithSiri) {
    const errorResult = {
      error: true,
      message: errorMessage,
    } as ErrorResult;

    if (_is_shortcut_json) {
      errorResult['_is_shortcut_json'] = _is_shortcut_json;
    }

    Script.setShortcutOutput(errorResult);
    Script.complete();
    // @ts-ignore
    return;
  }
}

const successResult = {
  ...inputData,
  success: true,
  shortcutDispatcher: 'This is a scriptable script.',
} as {
  _is_shortcut_json?: boolean;
};

if (_is_shortcut_json) {
  successResult['_is_shortcut_json'] = _is_shortcut_json;
}

// consoleLog('Success Result', JSON.stringify(successResult));

if (config.runsWithSiri) {
  Script.setShortcutOutput(successResult);
  Script.complete();
  // @ts-ignore
  return;
}
