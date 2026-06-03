import { beforeAll } from 'vitest';

// let files: any;

// (global as any).importModule = (modulePath: string) => {
//   if (modulePath === './consoleLog') {
//     return () => {}; // mock (do nothing)
//   }

//   if (modulePath === './isObjectNotEmpty') {
//     return files?.isObjectNotEmpty;
//   }

//   if (modulePath === './mainScript') {
//     return files?.mainScriptFunction;
//   }
//   return undefined;
// };

beforeAll(async () => {
  // files = await import('../src/_shortcut_internal/files');
});
