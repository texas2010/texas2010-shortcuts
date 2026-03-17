import { runShortcutShell } from './runShortcutShell';

interface RunScriptableParams {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
}

interface RunScriptableResSuccess<T> {
  success: true;
  data: T;
}

interface RunScriptableResError {
  error: true;
  message: string;
}

type RunScriptableReturn<T> = Promise<
  RunScriptableResSuccess<T> | RunScriptableResError
>;

export const runScriptableShortcut = async <T>(
  params: RunScriptableParams
): RunScriptableReturn<T> => {
  return runShortcutShell('RunScriptable', params);
};
