import { defineConfig } from 'vite';

const scriptableHeader = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: robot;

`;

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'es2022',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'ShortcutDispatcher.js',
    },
    rollupOptions: {
      output: {
        banner: scriptableHeader,
        codeSplitting: false,
      },
    },
  },
});
