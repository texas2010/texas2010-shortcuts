import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    fileParallelism: false,
    reporters: ['tree'],
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['e2e/**/*.test.ts'],
          globalSetup: './vitest/e2eGlobalSetup.ts',
          setupFiles: './vitest/e2eSetupFiles.ts',
        },
      },
    ],
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
  },
});
