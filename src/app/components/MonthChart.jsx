import { Chart } from "./Chart";
import tally from "../utils/tally";

class MonthData {
  constructor(key, value) {
    this.month = key;
    this.amount = value;
  }
}

export default function MonthChart({ data }) {
  const talliedData = tally(data, "month");

  const talliedMonthArray = [];

  for (let i = 1; i <= 12; i++) {
    let existsInSet = false;
    for (let ii = 0; ii <= 12; ii++) {
      if (i == Object.keys(talliedData)[ii]) {
        talliedMonthArray.push(
          new MonthData(
            Object.keys(talliedData)[ii],
            Object.values(talliedData)[ii]
          )
        );
        existsInSet = true;
      }
    }
    !existsInSet ? talliedMonthArray.push(new MonthData(i, 0)) : "";
  }

  return (
    <>
      <Chart coffeeData={talliedMonthArray} title="Month" />
    </>
  );
}
