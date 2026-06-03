import { spawn } from 'node:child_process';
import type { TestProject } from 'vitest/node';

import { buildStatusJson } from './vitest-build-status';

async function runBuild(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });

    build.on('error', async (error) => {
      await buildStatusJson.write({ isBuildPassed: false });
      console.log('Build status: failed');

      reject(error);
    });

    build.on('exit', async (code) => {
      if (code === 0) {
        await buildStatusJson.write({ isBuildPassed: true });
        console.log('Build status: passed');

        resolve();
        return;
      }

      await buildStatusJson.write({ isBuildPassed: false });
      console.log('Build status: failed');

      reject(new Error(`Build failed with exit code ${code}`));
    });
  });
}

export default async function globalSetup(project: TestProject) {
  project.onTestsRerun(async () => {
    await runBuild();
  });

  await runBuild();
}
