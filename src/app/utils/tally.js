/**
 * Counts the occurrences of each value of a specified key in a dataset.
 *
 * Creates a new object (`tallyObj`) to store unique key values and their respective counts.
 * If a key already exists in `tallyObj`, its count is incremented; otherwise, the key is initialized with a value of 1.
 *
 * @param {Object[]} data - The dataset to tally, represented as an array of objects.
 * @param {string} key -    The key in each object to count occurrences of.
 *
 * @returns {Object} An object containing each unique key to its occurrence count.
 *
 * @example
 * const data = [{ hour: 1, month: 1 }, { hour: 1, month: 1 }, { hour: 3, month: 3 }];
 * tally(data, "hour"); // { 1: 2, 3: 1 }
 */

export default function tally(data, key) {
  const tallyObj = new Object();

  data.forEach((datum) => {
    if (tallyObj[datum[key]]) {
      tallyObj[datum[key]]++;
    } else {
      tallyObj[datum[key]] = 1;
    }
  });

  return tallyObj;
}
