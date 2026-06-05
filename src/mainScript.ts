import { toJson } from './utils/json/toJson';
import { normalizeShortcutInput } from './utils/normalizeShortcutInput';
import { validateRunScriptableRequest } from './utils/validateRunScriptableRequest';

// interface shortcutParameter {
//   actionType: string;
//   sourceShortcut: string;
//   inputData: object;
//   options?: object;
// }

interface ErrorResult {
  error: boolean;
  message: string;
}

interface SuccessResult {
  success: boolean;
  message: string;
}

const createErrorResult = (message: string): string => {
  const errorResult: ErrorResult = {
    error: true,
    message,
  };

  return toJson(errorResult);
};

const createSuccessResult = (): string => {
  const successResult: SuccessResult = {
    success: true,
    message: 'This is a success message',
  };
  return toJson(successResult);
};

export const mainScript = (rawShortcutParameter?: unknown): string => {
  const inputResult = normalizeShortcutInput(rawShortcutParameter);

  if (!inputResult.success) {
    return createErrorResult(inputResult.message);
  }

  const validation = validateRunScriptableRequest(
    inputResult.shortcutParameter,
  );

  if (!validation.success) {
    return createErrorResult(validation.message);
  }

  return createSuccessResult();
};
