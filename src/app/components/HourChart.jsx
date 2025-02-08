import { Chart } from "./Chart";
import tally from "../utils/tally";

class HourData {
  constructor(key, value) {
    this.hour = key;
    this.amount = value;
  }
}

export default function HourChart({ data }) {
  const talliedData = tally(data, "hour");

  const talliedHourArray = [];

  for (let i = 0; i < 24; i++) {
    let existsInSet = false;
    for (let ii = 0; ii < 24; ii++) {
      if (i == Object.keys(talliedData)[ii]) {
        talliedHourArray.push(
          new HourData(
            Object.keys(talliedData)[ii],
            Object.values(talliedData)[ii]
          )
        );
        existsInSet = true;
      }
    }
    !existsInSet ? talliedHourArray.push(new HourData(i, 0)) : "";
  }

  //   console.log(talliedHourArray);

  return (
    <>
      <Chart coffeeData={talliedHourArray} title="Hour" />
    </>
  );
}
