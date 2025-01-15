"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [coffeeData, setCoffeeData] = useState([]);

  useEffect(() => {
    fetch("/api/get-items")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCoffeeData(data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
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
