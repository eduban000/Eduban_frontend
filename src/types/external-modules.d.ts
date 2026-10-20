/**
 * Ambient declarations for optional/experimental modules used by the BCI
 * research code that are not installed as typed dependencies.
 *
 * - `brainflow` is a native Node binding (not bundled into the browser build).
 * - `ml-matrix` is used by the experimental signal-processing utilities.
 *
 * Declaring them here lets `tsc` type-check the surrounding code as `any`
 * without pulling heavy/native packages into the frontend dependency tree.
 */
declare module 'brainflow';
declare module 'ml-matrix';
