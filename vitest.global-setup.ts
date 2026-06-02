import { spawn } from 'node:child_process';

export default async function globalSetup() {
  await new Promise<void>((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });

    build.on('error', reject);
    build.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with exit code ${code}`));
      }
    });
  });
}
