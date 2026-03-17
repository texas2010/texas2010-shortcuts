// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: robot;

interface shortcutParameter {
  actionType: string;
  sourceShortcut: string;
  inputData: object;
  options?: object;
}

const { actionType, sourceShortcut, inputData } =
  args.shortcutParameter as shortcutParameter;

const consoleLog = async (subtitle: string = '', body: string) => {
  const n = new Notification();
  n.title = 'Console Log';
  n.subtitle = subtitle;
  n.body = body;
  await n.schedule();
};

if (!actionType || !sourceShortcut) {
  let errorMessage;
  if (!actionType && !sourceShortcut) {
    errorMessage = "actionType and sourceShortcut can't be empty";
  } else if (!actionType) {
    errorMessage = "actionType can't be empty";
  } else if (!sourceShortcut) {
    errorMessage = "sourceShortcut can't be empty";
  }

  if (config.runsWithSiri) {
    Script.setShortcutOutput({
      error: true,
      message: errorMessage,
    });
    Script.complete();
    // @ts-ignore
    return;
  }
}

const result = {
  ...inputData,
  shortcutDispatcher: 'This is a scriptable script.',
};

if (config.runsWithSiri) {
  Script.setShortcutOutput(result);
  Script.complete();
  // @ts-ignore
  return;
}
