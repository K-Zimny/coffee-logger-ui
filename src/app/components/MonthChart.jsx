import { Chart } from "./Chart";
import tally from "../utils/tally";
import order from "../utils/order";

class MonthData {
  constructor(key, value) {
    this.month = key;
    this.amount = value;
  }
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthChart({ data }) {
  const talliedData = tally(data, "month");
  const orderedData = order(talliedData, MonthData, 1, 12);

  return (
    <>
      <Chart data={orderedData} labels={MONTHS} />
    </>
  );
}
