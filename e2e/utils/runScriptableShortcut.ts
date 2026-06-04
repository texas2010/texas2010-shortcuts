import { runShortcutShell } from './runShortcutShell';

export interface RunScriptableParams {
  _test_json: boolean;
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
}

export const runScriptableShortcut = async <T>(params: RunScriptableParams) => {
  const newParams =
    params && typeof params === 'object' && !Array.isArray(params)
      ? { ...params, _test_json: true }
      : params;
  try {
    return runShortcutShell<T>('RunScriptable', newParams);
  } catch (error) {
    throw new Error('RunScriptable failed');
  }
};
