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

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const HOURS = [
  '12am',
  '1am',
  '2am',
  '3am',
  '4am',
  '5am',
  '6am',
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12pm'
];

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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display:false,
        position: "top",
      },
      title: {
        display: false,
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

  const dateArray = []

  if(title == "Month") {
    for(let i = 0; i < MONTHS.length; i++)
      dateArray.push(MONTHS[i])
  }

  const hourArray = []

  if(title == "Hour") {
    for(let i = 0; i < HOURS.length; i++)
      hourArray.push(HOURS[i])
  }
  
  const labels = title == "Month" ? dateArray : hourArray

  const data = {
    labels,
    datasets: [
      {
        label: "Pots",
        data: dataArray,
        backgroundColor: "#967259",
        borderColor: "#725038",
        borderWidth: 4,
        borderRadius: 5,
        barPercentage: .75
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
