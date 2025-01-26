import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export function Chart({ coffeeData, title }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Brews By ${title}`,
      },
    },
  };

  const labelArray = []
  const dataArray = [] 
  for(let i = 0; i < coffeeData.length; i++){
    const time = Object.values(coffeeData[i])
    const amount = Object.values(coffeeData[i])
    labelArray.push(time[0])
    dataArray.push(amount[1])
  }
  console.log("labelArray", labelArray)
  console.log("amount", dataArray)

  const labels = labelArray

  const data = {
    labels,
    datasets: [
      {
        label: "Brews",
        data: dataArray,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
