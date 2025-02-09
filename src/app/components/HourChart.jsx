import { Chart } from "./Chart";
import tally from "../utils/tally";
import order from "../utils/order";

class HourData {
  constructor(key, value) {
    this.hour = key;
    this.amount = value;
  }
}

const HOURS = [
  "12am",
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
  "12pm",
];

export default function HourChart({ data }) {
  const talliedData = tally(data, "hour");
  const orderedData = order(talliedData, HourData, 0, 24);

  return (
    <>
      <Chart data={orderedData} labels={HOURS} />
    </>
  );
}
