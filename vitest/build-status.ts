import { JsonFile } from '@texas2010/lib/backend';

export type VitestBuildStatus = {
  isBuildPassed: boolean;
};

export const buildStatusJson = new JsonFile<VitestBuildStatus>(
  'vitest/build-status.json',
);
