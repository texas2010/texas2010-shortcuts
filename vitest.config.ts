import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    fileParallelism: false,
    include: ['integration/**/*.test.ts', 'src/**/*.test.ts'],
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
    globalSetup: './vitest.global-setup.ts',
    setupFiles: './vitest.setup.ts',
  },
});
