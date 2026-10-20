/**
 * Test stub for the native `brainflow` module (not installable in a browser/CI
 * context). Wired via `moduleNameMapper` in jest.config.js so BCI code that
 * imports brainflow can be loaded and its simulated/fallback paths tested.
 */
class BoardShim {}
class BrainFlowInputParams {}
class DataFilter {}

module.exports = {
  BoardShim,
  BrainFlowInputParams,
  DataFilter,
  AggOperations: {},
  FilterTypes: {},
};
