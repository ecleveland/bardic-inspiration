import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { assertNoUnroutedRequests } from './src/test/fetch-stub';

afterEach(() => {
  // Testing Library only auto-cleans when vitest globals are enabled, and they
  // are not. Unmount by hand so a leaked tree cannot leak into the next spec.
  cleanup();
  // After cleanup, so unmount-triggered requests are counted too.
  assertNoUnroutedRequests();
});
