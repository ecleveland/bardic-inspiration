import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  // Resolves the `@/*` mapping from tsconfig.json, so there is no second alias
  // map to keep in sync with it.
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.spec.{ts,tsx}'],
    // Globals stay off: every spec imports describe/it/expect/vi from vitest,
    // which keeps eslint.config.mjs free of test-only environment config.
    globals: false,
    // Restores anything vi.stubGlobal touched, so one spec forgetting to
    // clean up cannot leak a stubbed fetch into the next file.
    unstubGlobals: true,
  },
});
