import { Chart } from "./Chart";
import tally from "../utils/tally";
import order from "../utils/order";

class HourData {
  constructor(key, value) {
    this.hour = key;
    this.amount = value;
  }
}

export default function HourChart({ data }) {
  const talliedData = tally(data, "hour");
  const orderedData = order(talliedData, HourData, 0, 24);

  return (
    <>
      <Chart coffeeData={orderedData} title="Hour" />
    </>
  );
}
