import { runShortcutShell } from './runShortcutShell';

export interface RunScriptableParams {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
}

export const runScriptableShortcut = async <T>(params: RunScriptableParams) => {
  return runShortcutShell<T, RunScriptableParams>('RunScriptable', params);
};
