interface shortcutParameter {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
  readonly _test_json?: boolean;
}

interface ErrorResult {
  error: boolean;
  message: string;
  _test_json?: boolean;
}

const mainScriptFunction = (rawShortcutParameter: any) => {
  // const consoleLog = importModule('./consoleLog');
  const isObjectNotEmpty = importModule('./isObjectNotEmpty');

  const rawInput =
    rawShortcutParameter && typeof rawShortcutParameter === 'object'
      ? { ...rawShortcutParameter }
      : rawShortcutParameter;

  // consoleLog('result', JSON.stringify(rawShortcutParameter));

  if (
    rawShortcutParameter &&
    typeof rawShortcutParameter === 'object' &&
    '_test_json' in rawShortcutParameter
  ) {
    delete rawInput['_test_json'];
  }

  if (
    !rawInput ||
    typeof rawInput !== 'object' ||
    !isObjectNotEmpty(rawInput)
  ) {
    let errorMessage;
    if (!rawInput) {
      errorMessage = 'Input must be exist';
    } else if (typeof rawInput !== 'object') {
      errorMessage = 'Input must be Dictionary';
    } else if (!isObjectNotEmpty(rawInput)) {
      errorMessage = `Input object can't be empty`;
    }

    const errorResult = {
      error: true,
      message: errorMessage,
    } as ErrorResult;

    if (
      rawShortcutParameter &&
      typeof rawShortcutParameter === 'object' &&
      '_test_json' in rawShortcutParameter
    ) {
      errorResult['_test_json'] = rawShortcutParameter._test_json;
    }

    return errorResult;
  }

  const { actionType, sourceShortcut, inputData } =
    rawShortcutParameter as shortcutParameter;

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
    const errorResult = {
      error: true,
      message: errorMessage,
    } as ErrorResult;

    if ('_test_json' in rawShortcutParameter) {
      errorResult['_test_json'] = rawShortcutParameter._test_json;
    }

    return errorResult;
  }

  const successResult = {
    ...inputData,
    success: true,
    shortcutDispatcher: 'This is a scriptable script.',
  } as {
    _test_json?: boolean;
  };

  if ('_test_json' in rawShortcutParameter) {
    successResult['_test_json'] = rawShortcutParameter._test_json;
  }

  // consoleLog('Success Result', JSON.stringify(successResult));

  return successResult;
};

module.exports = mainScriptFunction;
