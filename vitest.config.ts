import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    fileParallelism: false,
    include: ['integration/**/*.test.ts'],
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
  },
});
