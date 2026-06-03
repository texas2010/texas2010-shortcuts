import { beforeAll, assert } from 'vitest';

import { buildStatusJson } from './build-status';

beforeAll(async () => {
  const buildStatus = await buildStatusJson.read();

  assert(
    buildStatus.isBuildPassed,
    'Build failed. Tests stopped because dist is not safe to use.',
  );
});
