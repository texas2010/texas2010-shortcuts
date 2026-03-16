// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: robot;

const rawInput = args.shortcutParameter;

const result = rawInput.inputData;

if (config.runsWithSiri) {
  // Script.setShortcutOutput('ShortcutDispatcher Script');
  Script.setShortcutOutput(result);
  Script.complete();
}
