import { runShortcutShell } from './runShortcutShell';

export interface RunScriptableParams {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
}

export const runScriptableShortcut = async <T>(params: RunScriptableParams) => {
  try {
    return runShortcutShell<T>('RunScriptable', params);
  } catch (error) {
    throw new Error('RunScriptable failed');
  }
};
