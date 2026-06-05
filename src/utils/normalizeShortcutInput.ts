import { isPlainObject } from './isPlainObject';
import { isValidJson } from './json/isValidJson';

type InputResult =
  | {
      success: true;
      shortcutParameter: object;
    }
  | {
      success: false;
      message: string;
    };

export const normalizeShortcutInput = (
  rawShortcutParameter?: unknown,
): InputResult => {
  if (!rawShortcutParameter) {
    return {
      success: false,
      message: 'Input must exist',
    };
  }

  if (
    typeof rawShortcutParameter !== 'string' &&
    !isPlainObject(rawShortcutParameter)
  ) {
    return {
      success: false,
      message: 'Input must be an object or JSON string',
    };
  }

  if (typeof rawShortcutParameter === 'string') {
    if (!isValidJson(rawShortcutParameter)) {
      return {
        success: false,
        message: 'Input must be JSON',
      };
    }

    const parsed = JSON.parse(rawShortcutParameter);

    if (!isPlainObject(parsed)) {
      return {
        success: false,
        message: 'Input must be a JSON object',
      };
    }

    return {
      success: true,
      shortcutParameter: parsed,
    };
  }

  return {
    success: true,
    shortcutParameter: rawShortcutParameter,
  };
};
