/**
 * Orders a dataset sequentially in ascending order.
 *
 * Iterates through a given range (from `start` to `loop`), ensuring all possible values are present.
 * If a value exists in `data`, it is used; otherwise, a default value is assigned.
 *
 * A provided class constructor (`ClassType`) is used to create objects for each entry.
 *
 * The result is an array of objects, each representing a key and its occurrence count.
 *
 * @param {Object} data - An object containing key-value pairs to be ordered.
 * @param {Function} ClassType - A class constructor defining the structure of each object.
 * @param {number} start - The starting index for ordering.
 * @param {number} loop - The end index for ordering (inclusive).
 * @returns {Object[]} An array of objects in sequential ascending order.
 *
 * @example
 * class MonthData {
 *   constructor(key, value) {
 *     this.month = key;
 *     this.amount = value;
 *   }
 * }
 *
 * const data = { 1: 5, 3: 2, 5: 7 };
 * order(data, MonthData, 1, 5);
 * // Returns:
 * // [
 * //   MonthData { name: 1, occurrences: 5 },
 * //   MonthData { name: 2, occurrences: 0 },
 * //   MonthData { name: 3, occurrences: 2 },
 * //   MonthData { name: 4, occurrences: 0 },
 * //   MonthData { name: 5, occurrences: 7 }
 * // ]
 */

export default function order(data, ClassType, start, loop) {
  const tempArr = [];
  for (let i = start; i <= loop; i++) {
    let existsInSet = false;

    for (let ii = 0; ii <= loop; ii++) {
      if (i == Object.keys(data)[ii]) {
        tempArr.push(
          new ClassType(Object.keys(data)[ii], Object.values(data)[ii])
        );
        existsInSet = true;
      }
    }
    !existsInSet ? tempArr.push(new ClassType(i, 0)) : "";
  }

  return tempArr;
}
