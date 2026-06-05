import { isPlainObject } from './isPlainObject';

type RunScriptableParams = {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
};

type ValidateRunScriptableRequestSuccess = {
  success: true;
  request: RunScriptableParams;
};

type ValidateRunScriptableRequestFailure = {
  success: false;
  message: string;
};

type ValidateRunScriptableRequestResult =
  | ValidateRunScriptableRequestSuccess
  | ValidateRunScriptableRequestFailure;

export const validateRunScriptableRequest = (
  value: object,
): ValidateRunScriptableRequestResult => {
  if (!isPlainObject(value)) {
    return {
      success: false,
      message: 'RunScriptable request must be an object',
    };
  }

  const request = value as {
    actionType?: unknown;
    sourceShortcut?: unknown;
    inputData?: unknown;
    options?: unknown;
  };

  if (
    typeof request.actionType !== 'string' ||
    request.actionType.trim() === ''
  ) {
    return {
      success: false,
      message: 'RunScriptable request actionType must be a non-empty string',
    };
  }

  if (
    typeof request.sourceShortcut !== 'string' ||
    request.sourceShortcut.trim() === ''
  ) {
    return {
      success: false,
      message:
        'RunScriptable request sourceShortcut must be a non-empty string',
    };
  }

  if (!isPlainObject(request.inputData)) {
    return {
      success: false,
      message: 'RunScriptable request inputData must be an object',
    };
  }

  if (request.options !== undefined && !isPlainObject(request.options)) {
    return {
      success: false,
      message: 'RunScriptable request options must be an object when provided',
    };
  }

  const result: RunScriptableParams = {
    actionType: request.actionType,
    sourceShortcut: request.sourceShortcut,
    inputData: request.inputData,
  };

  if (request.options !== undefined) {
    result.options = request.options;
  }

  return {
    success: true,
    request: result,
  };
};
