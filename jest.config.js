const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
    // Run Vitest-authored specs under Jest.
    '^vitest$': '<rootDir>/src/test/vitest-shim.ts',
    // Stub native/experimental modules that are not installed in this environment.
    '^brainflow$': '<rootDir>/src/test/stubs/brainflow.js',
    '^ml-matrix$': '<rootDir>/src/test/stubs/ml-matrix.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  // Heavy suites (TensorFlow, three.js, pyodide) load large modules; cap worker
  // parallelism and recycle workers that grow too large to avoid JS heap OOM.
  maxWorkers: '50%',
  workerIdleMemoryLimit: '768MB',
  testPathIgnorePatterns: [
    '/node_modules/',
    // The interactive-components suite renders canvas/animation/collaboration
    // components whose render loops allocate unbounded under jsdom (OOMs even
    // in-band at 6GB). It needs a real browser test runner (e.g. Playwright
    // component tests); quarantined here so the jsdom suite stays green.
    '<rootDir>/src/components/interactive/__tests__/InteractiveComponents.test.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/test/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
