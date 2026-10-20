/**
 * Test stub for `ml-matrix`, wired via `moduleNameMapper` in jest.config.js so
 * the experimental BCI signal-processing code loads under Jest. Provides a
 * minimal Matrix with the operations the code exercises.
 */
class Matrix {
  constructor(data = []) {
    this.data = data;
    this.rows = Array.isArray(data) ? data.length : 0;
    this.columns = Array.isArray(data) && data.length ? data[0].length : 0;
  }
  static zeros(rows, columns) {
    return new Matrix(Array.from({ length: rows }, () => new Array(columns).fill(0)));
  }
  get(i, j) {
    return this.data[i]?.[j];
  }
  set(i, j, value) {
    if (!this.data[i]) this.data[i] = [];
    this.data[i][j] = value;
    return this;
  }
  to2DArray() {
    return this.data;
  }
}

module.exports = { Matrix, default: Matrix };
