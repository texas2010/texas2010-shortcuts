// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: robot;

const mainScript = importModule('./_shortcut_internal/mainScript');
const mainScriptResult = mainScript(args.shortcutParameter);

Script.setShortcutOutput(mainScriptResult);
Script.complete();
