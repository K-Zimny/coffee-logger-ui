import { Chart } from "./Chart";
import tally from "../utils/tally";
import order from "../utils/order";

class MonthData {
  constructor(key, value) {
    this.month = key;
    this.amount = value;
  }
}

export default function MonthChart({ data }) {
  const talliedData = tally(data, "month");
  const orderedData = order(talliedData, MonthData, 1, 12);

  return (
    <>
      <Chart coffeeData={orderedData} title="Month" />
    </>
  );
}
