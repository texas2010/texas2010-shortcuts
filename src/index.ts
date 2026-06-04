import { mainScript } from './mainScript';

const mainScriptResult = mainScript(args.shortcutParameter);

Script.setShortcutOutput(mainScriptResult);
Script.complete();
