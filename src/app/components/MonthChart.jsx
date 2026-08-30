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

const FIRST_DATA_YEAR = 2025;

const YEAR_STYLES = [
  { backgroundColor: "#967259", borderColor: "#6B4A32" },
  { backgroundColor: "#3D2314", borderColor: "#1F120A" },
  { backgroundColor: "#D4A574", borderColor: "#A67B4A" },
  { backgroundColor: "#B85C38", borderColor: "#7A3D24" },
  { backgroundColor: "#5C6B4A", borderColor: "#3D4635" },
  { backgroundColor: "#8B6914", borderColor: "#5C450D" },
  { backgroundColor: "#6B4423", borderColor: "#422A15" },
  { backgroundColor: "#C9A227", borderColor: "#8A6B1A" },
];

function getYearStyle(year) {
  const index = (year - FIRST_DATA_YEAR) % YEAR_STYLES.length;
  return YEAR_STYLES[index];
}

export default function MonthChart({ data }) {
  const years = [...new Set(data.map((datum) => datum.year))].sort(
    (a, b) => a - b
  );

  const datasets = years.map((year) => {
    const yearData = data.filter((datum) => datum.year === year);
    const talliedData = tally(yearData, "month");
    const orderedData = order(talliedData, MonthData, 1, 12);
    const style = getYearStyle(year);

    return {
      label: String(year),
      data: orderedData.map((item) => item.amount),
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: 4,
      borderRadius: 5,
      barPercentage: 0.75,
    };
  });

  return (
    <>
      <Chart labels={MONTHS} datasets={datasets} />
    </>
  );
}
