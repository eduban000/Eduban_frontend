/**
 * Shim that maps Vitest's test API onto Jest's globals, so specs authored for
 * Vitest run under this project's Jest runner. Wired via `moduleNameMapper`
 * (`^vitest$`) in jest.config.js. `vi` aliases Jest's mock API.
 */
export const vi = jest;
export const describe = globalThis.describe;
export const it = globalThis.it;
export const test = globalThis.test;
export const expect = globalThis.expect;
export const beforeEach = globalThis.beforeEach;
export const afterEach = globalThis.afterEach;
export const beforeAll = globalThis.beforeAll;
export const afterAll = globalThis.afterAll;
