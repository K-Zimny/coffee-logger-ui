"use client";

import { useEffect, useState } from "react";
import mockdata from "@/app/mockdata.json";

export default function Home() {
  const isLiveData = false; // Set true for DB data
  const [coffeeData, setCoffeeData] = useState([]);

  useEffect(() => {
    if (isLiveData) {
      fetch("/api/get-items")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseJson) => {
          setCoffeeData(orderByTime(responseJson));
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else {
      setCoffeeData(orderByTime(mockdata));
    }
  }, []);

  let orderedArray = [];
  const orderByTime = (data) => {
    data.map((item) => {
      orderedArray.push(item.Timestamp);
    });
    console.log("orderedArray: ", orderedArray);
    return orderedArray;
  };

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>Number of Pots Brewed: {coffeeData.length}</p>
        <hr />
        <p>Data:</p>
        <ul>
          {coffeeData.map((brew) => {
            return <li key={brew}>{brew}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
