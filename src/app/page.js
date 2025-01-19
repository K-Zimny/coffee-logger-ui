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
          setCoffeeData(responseJson);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else {
      setCoffeeData(mockdata);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Coffee Logger</h1>
        <p>Number of Pots Brewed: {coffeeData.length}</p>
        <hr />
        <p>Data:</p>
        <ul>
          {coffeeData.map((item) => {
            return <li key={item.EventID}>{item.Timestamp}</li>;
          })}
        </ul>
      </div>
    </>
  );
}
