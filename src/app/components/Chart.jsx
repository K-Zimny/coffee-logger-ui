import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components once
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

/**
 * Renders a bar chart displaying data values with corresponding labels.
 *
 * This component utilizes `react-chartjs-2` and `Chart.js` to visualize data as a bar chart.
 *
 * @param {Object} props - The component props.
 * @param {Array<{ amount: number, unit_of_time: string }>} props.data -
 *        An array of objects representing data points, where each object contains:
 *        - `amount` (number): The numerical value associated with the unit of time.
 *        - `unit_of_time` (string): A descriptor for the time unit (e.g., months, hours).
 * @param {string[]} props.labels - An array of labels corresponding to each data point, providing human-readable labels for the chart.
 * @returns {JSX.Element} A bar chart representing the given data.
 *
 * @example
 * const data = [
 *   { unit_of_time: "1", amount: 5 },
 *   { unit_of_time: "2", amount: 8 },
 *   { unit_of_time: "3", amount: 3 }
 * ];
 * const labels = ["January", "February", "March"];
 *
 * <Chart data={data} labels={labels} />
 */
export function Chart({ data, labels }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  const dataValues = data.map((item) => item.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Pots",
        data: dataValues,
        backgroundColor: "#967259",
        borderColor: "#725038",
        borderWidth: 4,
        borderRadius: 5,
        barPercentage: 0.75,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
}
